import sql from './db';

export type Kind = 'memo' | 'task' | 'asset' | 'decision';
export type Priority = 'P0' | 'P1' | 'P2';
export type Status = 'open' | 'done';

export async function addMemo(args: {
  content: string;
  kind?: Kind;
  area?: string;
  priority?: Priority;
  due_date?: string;
}) {
  const { content, kind = 'memo', area = null, priority = null, due_date = null } = args;
  const status = kind === 'task' ? 'open' : null;

  const rows = await sql`
    INSERT INTO memos (content, kind, area, priority, status, due_date)
    VALUES (${content}, ${kind}, ${area}, ${priority}, ${status}, ${due_date})
    RETURNING id, created_at, updated_at, content, kind, area, priority, status, due_date
  `;
  const memo = rows[0];

  const related = await sql`
    SELECT id, content, kind, area, priority, status,
           similarity(content, ${content}) AS score
    FROM memos
    WHERE id != ${memo.id as string}
      AND (
        content ILIKE ${'%' + content.slice(0, 40) + '%'}
        OR similarity(content, ${content}) > 0.15
      )
    ORDER BY score DESC
    LIMIT 5
  `;

  return { memo, related_candidates: related };
}

export async function linkMemos(args: {
  from_id: string;
  to_id: string;
  reason: string;
}) {
  await sql`
    INSERT INTO links (from_id, to_id, reason)
    VALUES (${args.from_id}, ${args.to_id}, ${args.reason})
    ON CONFLICT (from_id, to_id)
    DO UPDATE SET reason = EXCLUDED.reason
  `;
  return { success: true };
}

export async function searchMemos(args: {
  query: string;
  kind?: Kind;
  area?: string;
}) {
  const { query, kind, area } = args;
  return sql`
    SELECT id, content, kind, area, priority, status, due_date, created_at,
           similarity(content, ${query}) AS score
    FROM memos
    WHERE (content ILIKE ${'%' + query + '%'} OR similarity(content, ${query}) > 0.1)
      AND (${kind ?? null}::text IS NULL OR kind = ${kind ?? null}::text)
      AND (${area ?? null}::text IS NULL OR area = ${area ?? null}::text)
    ORDER BY score DESC, created_at DESC
    LIMIT 20
  `;
}

export async function getMemo(args: { id: string }) {
  const rows = await sql`SELECT * FROM memos WHERE id = ${args.id}`;
  if (!rows[0]) throw new Error(`Memo ${args.id} not found`);

  const links_out = await sql`
    SELECT l.to_id, l.reason, l.created_at, m.content, m.kind, m.area
    FROM links l JOIN memos m ON m.id = l.to_id
    WHERE l.from_id = ${args.id}
  `;
  const links_in = await sql`
    SELECT l.from_id, l.reason, l.created_at, m.content, m.kind, m.area
    FROM links l JOIN memos m ON m.id = l.from_id
    WHERE l.to_id = ${args.id}
  `;

  return { ...rows[0], links_out, links_in };
}

export async function listMemos(args: {
  kind?: Kind;
  area?: string;
  status?: Status;
} = {}) {
  const { kind, area, status } = args;
  return sql`
    SELECT id, content, kind, area, priority, status, due_date, created_at
    FROM memos
    WHERE (${kind   ?? null}::text IS NULL OR kind   = ${kind   ?? null}::text)
      AND (${area   ?? null}::text IS NULL OR area   = ${area   ?? null}::text)
      AND (${status ?? null}::text IS NULL OR status = ${status ?? null}::text)
    ORDER BY created_at DESC
    LIMIT 100
  `;
}

export async function listRelated(args: { id: string }) {
  const { id } = args;
  const rows = await sql`SELECT content FROM memos WHERE id = ${id}`;
  if (!rows[0]) throw new Error(`Memo ${id} not found`);
  const content = rows[0].content as string;

  const linked = await sql`
    SELECT m.id, m.content, m.kind, m.area, m.priority, m.status,
           l.reason, 'outbound' AS direction
    FROM links l JOIN memos m ON m.id = l.to_id
    WHERE l.from_id = ${id}
    UNION ALL
    SELECT m.id, m.content, m.kind, m.area, m.priority, m.status,
           l.reason, 'inbound' AS direction
    FROM links l JOIN memos m ON m.id = l.from_id
    WHERE l.to_id = ${id}
  `;

  const candidates = await sql`
    SELECT id, content, kind, area, similarity(content, ${content}) AS score
    FROM memos
    WHERE id != ${id}
      AND id NOT IN (
        SELECT to_id FROM links WHERE from_id = ${id}
        UNION
        SELECT from_id FROM links WHERE to_id = ${id}
      )
      AND similarity(content, ${content}) > 0.1
    ORDER BY score DESC
    LIMIT 5
  `;

  return { linked, candidates };
}

export async function updateMemo(args: {
  id: string;
  content?: string;
  kind?: Kind;
  area?: string | null;
  priority?: Priority | null;
  status?: Status;
  due_date?: string | null;
}) {
  const { id } = args;
  const rows = await sql`SELECT * FROM memos WHERE id = ${id}`;
  if (!rows[0]) throw new Error(`Memo ${id} not found`);
  const m = rows[0];

  const updated = await sql`
    UPDATE memos SET
      content  = ${args.content  !== undefined ? args.content  : m.content  as string},
      kind     = ${args.kind     !== undefined ? args.kind     : m.kind     as string},
      area     = ${'area'     in args ? (args.area     ?? null) : m.area},
      priority = ${'priority' in args ? (args.priority ?? null) : m.priority},
      status   = ${args.status   !== undefined ? args.status   : m.status},
      due_date = ${'due_date' in args ? (args.due_date ?? null) : m.due_date}
    WHERE id = ${id}
    RETURNING id, created_at, updated_at, content, kind, area, priority, status, due_date
  `;
  return updated[0];
}

export async function completeTask(args: { id: string }) {
  const rows = await sql`
    UPDATE memos SET status = 'done'
    WHERE id = ${args.id} AND kind = 'task'
    RETURNING id, content, kind, status
  `;
  if (!rows[0]) throw new Error(`Task ${args.id} not found or not a task`);
  return rows[0];
}

export async function listTasks(args: {
  status?: Status;
  priority?: Priority;
} = {}) {
  const { status, priority } = args;
  return sql`
    SELECT id, content, area, priority, status, due_date, created_at
    FROM memos
    WHERE kind = 'task'
      AND (${status   ?? null}::text IS NULL OR status   = ${status   ?? null}::text)
      AND (${priority ?? null}::text IS NULL OR priority = ${priority ?? null}::text)
    ORDER BY
      CASE priority WHEN 'P0' THEN 1 WHEN 'P1' THEN 2 WHEN 'P2' THEN 3 ELSE 4 END,
      due_date ASC NULLS LAST,
      created_at DESC
  `;
}

export async function exportAll(args: { format?: 'json' | 'markdown' } = {}) {
  const format = args.format ?? 'json';
  const memos = await sql`SELECT * FROM memos ORDER BY created_at ASC` as Record<string, unknown>[];
  const links = await sql`SELECT * FROM links ORDER BY created_at ASC` as Record<string, unknown>[];

  if (format === 'json') {
    return JSON.stringify({ memos, links, exported_at: new Date().toISOString() }, null, 2);
  }

  const lines: string[] = [
    '# Second Brain Export',
    '',
    `Exported: ${new Date().toISOString()}`,
    `Memos: ${memos.length} / Links: ${links.length}`,
    '',
  ];

  for (const m of memos) {
    lines.push(`## [${(m.kind as string).toUpperCase()}] ${m.id}`);
    if (m.area)     lines.push(`- **Area**: ${m.area}`);
    if (m.priority) lines.push(`- **Priority**: ${m.priority}`);
    if (m.status)   lines.push(`- **Status**: ${m.status}`);
    if (m.due_date) lines.push(`- **Due**: ${m.due_date}`);
    lines.push(`- **Created**: ${m.created_at}`);
    lines.push('');
    lines.push(m.content as string);
    lines.push('');
    const outLinks = links.filter((l) => l.from_id === m.id);
    if (outLinks.length) {
      lines.push('**Links →**');
      for (const l of outLinks) lines.push(`- ${l.to_id}: ${l.reason}`);
      lines.push('');
    }
    lines.push('---');
    lines.push('');
  }

  return lines.join('\n');
}
