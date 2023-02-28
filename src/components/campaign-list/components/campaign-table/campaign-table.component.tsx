import { Table } from "antd";
import {
  BasicCampaign,
  CampaignPaginated,
} from "../../../../interfaces/campaign.interface";
import { getCampaignPaginated } from "../../../../api/requests/campaign";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const columns = [
  {
    title: "Campanha",
    dataIndex: "name",
    key: "name",
  },
];

export function CampaignTableComponent() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [totalElements, setTotalElements] = useState(0);
  const [list, setList] = useState<BasicCampaign[]>([]);
  const [retrievedPages, setRetrievedPages] = useState<any>({});

  const pageSize = 10;

  function fetchListPaginated(page: number) {
    setLoading(true);
    if (retrievedPages[page] && retrievedPages[page].length > 0) {
      setList(retrievedPages[page]);
      setLoading(false);
    } else {
      getCampaignPaginated(pageSize, page)
        .then((r) => {
          const {
            data: { list: dataList, totalElements },
          }: { data: CampaignPaginated } = r;
          setTotalElements(totalElements);
          setList(dataList);
          setRetrievedPages({
            ...retrievedPages,
            [page]: dataList,
          });
        })
        .catch((ex) => {
          console.error(ex);
        })
        .finally(() => setLoading(false));
    }
  }

  useEffect(() => {
    fetchListPaginated(0);
  }, []);

  return (
    <Table
      className="campaign-table"
      loading={loading}
      columns={columns}
      dataSource={list}
      rowKey="id"
      pagination={{
        hideOnSinglePage: true,
        position: ["bottomCenter"],
        size: "small",
        total: totalElements,
        pageSize,
        onChange: (page) => {
          fetchListPaginated(page - 1);
        },
      }}
      onRow={(record) => {
        return {
          onClick: () => {
            const { id } = record;
            navigate(`/campaign/${id}`);
          },
        };
      }}
      scroll={{
        scrollToFirstRowOnChange: false,
        y: 300,
      }}
    />
  );
}
