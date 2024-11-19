"use client";

import { Table, Button } from "flowbite-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

export default function NovelList() {
  const t = useTranslations("NovelList");

  const apiUrl = "https://directus.keyframeai.top";

  const [novelList, setNovelList] = useState([]);
  useEffect(() => {
    // 最新的 15条
    fetch(`${apiUrl}/items/datas?limit=15&sort[]=-date_updated`)
      .then(res => res.json())
      .then(data => {
        setNovelList(data.data);
      });
  }, []);

  return (
    <section>
      <div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-24 lg:py-32">
        <div className="mb-8 text-center md:mb-12 lg:mb-16">
          <h2 className="text-3xl font-bold md:text-5xl text-[#ffffff]">
            {t("NovelListTitle")}
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-[#c9fd02]">
            {t("NovelListDescription")}
          </p>
        </div>

        <div className="overflow-x-auto rounded-lg">
          <Table className="!bg-[#131313]">
            <Table.Body className="divide-y divide-gray-700">
              <Table.Row className="!bg-[#1a1a1a] border-b border-gray-700">
                <Table.HeadCell className="!text-[#ffffff] !bg-[#1a1a1a]">{t("Nickname")}</Table.HeadCell>
                <Table.HeadCell className="!text-[#ffffff] !bg-[#1a1a1a]">{t("Description")}</Table.HeadCell>
                <Table.HeadCell className="!text-[#ffffff] !bg-[#1a1a1a]">{t("Like")}</Table.HeadCell>
                <Table.HeadCell className="!text-[#ffffff] !bg-[#1a1a1a]">{t("Comment")}</Table.HeadCell>
                <Table.HeadCell className="!text-[#ffffff] !bg-[#1a1a1a]">{t("Collect")}</Table.HeadCell>
                <Table.HeadCell className="!text-[#ffffff] !bg-[#1a1a1a]">{t("Share")}</Table.HeadCell>
                {/* <Table.HeadCell className="!text-[#ffffff] !bg-[#1a1a1a]">HotIndex</Table.HeadCell> */}
                <Table.HeadCell className="!text-[#ffffff] !bg-[#1a1a1a]">{t("Action")}</Table.HeadCell>
              </Table.Row>
              {novelList.map((item: any) =>
                <Table.Row 
                  key={item.id} 
                  className="!bg-[#131313] border-gray-700 hover:!bg-[#1a1a1a]"
                  style={{ backgroundColor: '#131313' }}
                >
                  <Table.Cell className="!text-[#636262]">{item.nickname}</Table.Cell>
                  <Table.Cell className="!text-[#636262]">{item.description?.slice(0, 30)}</Table.Cell>
                  <Table.Cell className="!text-[#636262]">{item.topic_like}</Table.Cell>
                  <Table.Cell className="!text-[#636262]">{item.topic_comment}</Table.Cell>
                  <Table.Cell className="!text-[#636262]">{item.topic_collect}</Table.Cell>
                  <Table.Cell className="!text-[#636262]">{item.topic_share}</Table.Cell>
                  {/* <Table.Cell className="!text-[#636262]">{item.hot_index}</Table.Cell> */}
                  <Table.Cell>
                    <a href={item.topic_link} target="_blank" rel="noopener noreferrer" className="font-medium text-[#c9fd02] hover:underline">
                      {t('Link')}
                    </a>
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table>
        </div>
        <p className="text-center text-[#636262]"><a href="#" className="text-[#c9fd02]">{t('Show More')}</a></p>

      </div>
    </section>
  );
}