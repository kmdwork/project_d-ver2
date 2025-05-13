import { auth } from "@/auth";
import { getDashboardStats } from "@/lib/ownDVDdata";

export default async function DashboardPage() {
  const session = await auth();
  const userId = session?.user?.id;
  if(!session?.user?.email || !userId) {
    throw new Error('不正なリクエストです')
  }

  // 日付と時刻を取得（日本時間に設定）
  // const now = new Date();
  // const formattedDate = new Intl.DateTimeFormat('ja-JP', {
  //   dateStyle: 'full',
  //   timeStyle: 'short',
  //   timeZone: 'Asia/Tokyo'
  // }).format(now);

  const stats = await getDashboardStats(userId);

  
  return (
    <div className="p-6 text-gray-700">
      <h1 className="text-3xl font-bold mb-4 text-gray-100">Dashboard</h1>

      <section className="mb-6 bg-gray-100 p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-2">ログイン情報</h2>
        <p><strong>ユーザー名:</strong> {session.user.name || '未設定'}</p>
        <p><strong>メール:</strong> {session.user.email}</p>
      </section>

      <section className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">DVDコレクションの概要</h2>

        {/* サマリーパネル（2つなので2カラム固定） */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-100 p-4 rounded-lg border text-center shadow-sm">
            <p className="text-sm text-gray-500">登録済みDVD数</p>
            <p className="text-2xl font-bold text-gray-800">{stats.totalCount} 件</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg border text-center shadow-sm">
            <p className="text-sm text-gray-500">未視聴DVD数</p>
            <p className="text-2xl font-bold text-gray-800">{stats.unwatchedCount} 件</p>
          </div>
        </div>

        {/* Box別作品数（1列で表示） */}
        <div>
          <h3 className="text-xl font-semibold mb-3 text-gray-700">Box別作品数</h3>
          <ul className="space-y-2">
            {stats.boxCounts.map((box) => (
              <li key={box.boxNumber} className="bg-gray-50 p-3 rounded border text-gray-700 shadow-sm">
                <span className="font-medium">Box{box.boxNumber}</span>： {box.count} 件
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}
