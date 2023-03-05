import debounce from "lodash.debounce";
import { useEffect, useMemo } from "react";
import { Modal, Select } from "antd";
import { IdName } from "../../../interfaces/id-name.interface";

export function SearchBarComponent({
  setModalVisible,
  isModalVisible,
  loading,
  selectedList,
  searchList,
  setSearchList,
  handleSelect,
  onSearch,
}: {
  setModalVisible: Function;
  isModalVisible: boolean;
  loading: boolean;
  selectedList: IdName[];
  searchList: IdName[];
  setSearchList: Function;
  handleSelect: (...args: any) => any;
  onSearch: (...args: any) => any;
}) {
  const debounceSearch = useMemo(() => {
    return debounce(onSearch, 800);
  }, []);

  function handleClose() {
    setModalVisible(false);
    setSearchList([]);
  }

  useEffect(() => {
    return () => {
      debounceSearch.cancel();
    };
  });

  return (
    <Modal
      closable={false}
      onCancel={() => handleClose()}
      open={isModalVisible}
      footer={null}
    >
      <Select
        showSearch
        value={null}
        style={{ width: "100%" }}
        placeholder="Buscar nome de personagem (Case-Sensitive)"
        defaultActiveFirstOption={false}
        showArrow={false}
        filterOption={false}
        onSearch={debounceSearch}
        onChange={handleSelect}
        loading={loading}
        notFoundContent={null}
        options={searchList
          .filter((d) => selectedList.findIndex((v) => v.id === d.id) === -1)
          .map((d) => ({
            value: d.id,
            label: d.name,
          }))}
      />
    </Modal>
  );
}
