import { useTranslations } from "next-intl";
import { headers } from 'next/headers';
import { useLocale } from "@/hooks/useLocale";

export default async function NovelList() {
  const headersList = headers();
  const locale = headersList.get('x-next-intl-locale') || 'default';
  const { getLocalizedHref } = useLocale(locale);

  const t = useTranslations("NovelList");

  const apiUrl = "https://directus.keyframeai.top";

  const novelListResponse = await fetch(`${apiUrl}/items/datas?limit=30&sort[]=-hot_index&sort[]=-topic_created_time`);
  const novelListData = await novelListResponse.json();
  const novelList = novelListData.data;

  const maxDateCreated = novelList.reduce((max: Date, item: any) => {
    return new Date(max) > new Date(item.date_created) ? max : item.date_created;
  }, new Date(0));

  return (
    <section id="novel-hot-list">
      <div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-24 lg:py-32">
        <div className="mb-8 text-center md:mb-12 lg:mb-16">
          <h2 className="text-3xl font-bold md:text-5xl text-white">
            {t("NovelListTitle")}
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-brand">
            {t("NovelListDescription")}
          </p>
          <div className="text-muted">
            最后一次数据更新时间（数据更新时间不确定，全靠手动整理，还请见谅）：{new Date(maxDateCreated).toLocaleString()}
          </div>
        </div>

        <div className="overflow-x-auto rounded-lg">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="bg-surface2 border-b border-gray-700">
                  <th className="px-4 py-3 text-white">{t("Nickname")}</th>
                  <th className="px-4 py-3 text-white">{t("Description")}</th>
                  <th className="px-4 py-3 text-white">{t("Hot Index")}</th>
                  <th className="px-4 py-3 text-white">{t("Action")}</th>
                </tr>
              </thead>
              <tbody>
                {novelList.map((item: any) => (
                  <tr key={item.id} className="bg-surface hover:bg-surface2 border-b border-gray-700 transition-colors">
                    <td className="px-4 py-3 text-muted">{item.nickname}</td>
                    <td className="px-4 py-3 text-muted">
                      {item.description?.slice(0, 45)}
                      {item.description?.length > 45 ? '...' : ''}
                    </td>
                    <td className={`px-4 py-3 font-bold ${item.hot_index > 5000 ? 'text-red-500' : item.hot_index > 3000 ? 'text-orange-500' : item.hot_index > 1000 ? 'text-yellow-500' : 'text-muted'}`}>
                      {item.hot_index}
                    </td>
                    <td className="px-4 py-3 flex items-center gap-2">
                      <a href={item.topic_link} target="_blank" rel="noopener noreferrer nofollow" className="font-medium text-brand hover:underline">
                        {t('Link')}
                      </a>
                      <a href={getLocalizedHref(`/leaderboard/topic/${item.id}`)} className="font-medium text-brand hover:underline">
                        {t('Detail')}
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <p className="text-center text-muted py-2">
          <a href={getLocalizedHref("/leaderboard")} className="text-brand">{t('Show More')}</a>
        </p>
      </div>
    </section>
  );
}
