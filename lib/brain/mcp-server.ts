import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';
import * as T from './tools';

export function registerTools(server: McpServer) {
  server.tool(
    'add_memo',
    'メモを保存する。保存後、関連しそうな既存メモの候補も返す（リンク判断用）',
    {
      content:  z.string().min(1).describe('メモの内容'),
      kind:     z.enum(['memo', 'task', 'asset', 'decision']).optional()
                  .describe('種別（デフォルト: memo）'),
      area:     z.string().optional()
                  .describe('エリア例: creative / practice / investing / other'),
      priority: z.enum(['P0', 'P1', 'P2']).optional().describe('優先度'),
      due_date: z.string().optional().describe('期限日 YYYY-MM-DD'),
    },
    async (args) => ({
      content: [{ type: 'text' as const, text: JSON.stringify(await T.addMemo(args), null, 2) }],
    })
  );

  server.tool(
    'link_memos',
    'メモ同士をリンクする',
    {
      from_id: z.string().uuid().describe('リンク元のメモID'),
      to_id:   z.string().uuid().describe('リンク先のメモID'),
      reason:  z.string().describe('なぜ関連するかの説明'),
    },
    async (args) => ({
      content: [{ type: 'text' as const, text: JSON.stringify(await T.linkMemos(args), null, 2) }],
    })
  );

  server.tool(
    'search_memos',
    'キーワードでメモを検索する（日本語対応）',
    {
      query: z.string().describe('検索キーワード'),
      kind:  z.enum(['memo', 'task', 'asset', 'decision']).optional().describe('種別フィルタ'),
      area:  z.string().optional().describe('エリアフィルタ'),
    },
    async (args) => ({
      content: [{ type: 'text' as const, text: JSON.stringify(await T.searchMemos(args), null, 2) }],
    })
  );

  server.tool(
    'get_memo',
    'IDでメモを1件取得する（リンク情報含む）',
    {
      id: z.string().uuid().describe('メモID'),
    },
    async (args) => ({
      content: [{ type: 'text' as const, text: JSON.stringify(await T.getMemo(args), null, 2) }],
    })
  );

  server.tool(
    'list_memos',
    'メモ一覧を取得する（最新100件）',
    {
      kind:   z.enum(['memo', 'task', 'asset', 'decision']).optional(),
      area:   z.string().optional(),
      status: z.enum(['open', 'done']).optional(),
    },
    async (args) => ({
      content: [{ type: 'text' as const, text: JSON.stringify(await T.listMemos(args), null, 2) }],
    })
  );

  server.tool(
    'list_related',
    'リンク済みおよび候補の関連メモを一覧表示する',
    {
      id: z.string().uuid().describe('起点となるメモID'),
    },
    async (args) => ({
      content: [{ type: 'text' as const, text: JSON.stringify(await T.listRelated(args), null, 2) }],
    })
  );

  server.tool(
    'update_memo',
    'メモのフィールドを更新する（指定したフィールドのみ変更）',
    {
      id:       z.string().uuid(),
      content:  z.string().optional(),
      kind:     z.enum(['memo', 'task', 'asset', 'decision']).optional(),
      area:     z.string().nullable().optional(),
      priority: z.enum(['P0', 'P1', 'P2']).nullable().optional(),
      status:   z.enum(['open', 'done']).optional(),
      due_date: z.string().nullable().optional().describe('YYYY-MM-DD または null でクリア'),
    },
    async (args) => ({
      content: [{ type: 'text' as const, text: JSON.stringify(await T.updateMemo(args), null, 2) }],
    })
  );

  server.tool(
    'complete_task',
    'タスクを完了（done）にする',
    {
      id: z.string().uuid().describe('完了にするタスクID'),
    },
    async (args) => ({
      content: [{ type: 'text' as const, text: JSON.stringify(await T.completeTask(args), null, 2) }],
    })
  );

  server.tool(
    'list_tasks',
    '今何すべきか確認用：タスクを優先度・期限順で返す',
    {
      status:   z.enum(['open', 'done']).optional().describe('フィルタ（省略時は全件）'),
      priority: z.enum(['P0', 'P1', 'P2']).optional(),
    },
    async (args) => ({
      content: [{ type: 'text' as const, text: JSON.stringify(await T.listTasks(args), null, 2) }],
    })
  );

  server.tool(
    'export_all',
    '全データをJSON/Markdownでエクスポートする',
    {
      format: z.enum(['json', 'markdown']).optional().describe('出力形式（デフォルト: json）'),
    },
    async (args) => ({
      content: [{ type: 'text' as const, text: await T.exportAll(args) }],
    })
  );
}
