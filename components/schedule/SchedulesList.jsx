import { Button, Space, Table } from 'antd';
import React, { useState } from 'react';
import AddSchedulesForm from './AddSchedulesForm';
import UpdateSchedulesForm from './UpdateSchedulesForm';
import { CustomButton } from '../buttons';
import CustomModal from '../CustomModal';
import NoData from '../NoData';
import SearchInput from '../SearchInput';
import defineSchedulesTableColumns from './schedulesTableColumns';
import { getSchedules } from '../../actions/scheduleActions';

function EmptyBox(mssg, showAddModal) {
  return (
    <NoData description={mssg || 'No Data'}>
      <Button type="primary" onClick={showAddModal}>
        Create Schedules
      </Button>
    </NoData>
  );
}

function SchedulesList() {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState({
    searchBtn: false,
    table: false,
  });
  const [notFoundMssg, setNotFoundMssg] = useState('');
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);

  const onSearch = async (value) => {
    // set loading
    setLoading({ searchBtn: true, table: true });

    // call getSchedules action.
    const foundSchedules = await getSchedules(value);
    console.log(value);

    if (foundSchedules.length < 1) {
      // set empty data message
      setNotFoundMssg('Ooops!... No schedules found');
    }

    setSchedules(foundSchedules);

    // unset loading
    setLoading({ searchBtn: false, table: false });
  };

  const showAddModal = () => {
    setAddModalVisible(true);
  };

  const onAddFormModalCancel = () => {
    console.log('Clicked cancel button');
    setAddModalVisible(false);
  };

  const showEditModal = () => {
    setEditModalVisible(true);
  };

  const onEditFormModalCancel = () => {
    console.log('Clicked cancel button');
    setEditModalVisible(false);
  };

  const columns = defineSchedulesTableColumns();

  return (
    <div>
      <Space size={30} style={{ marginBottom: 20 }}>
        <SearchInput
          placeholder="input train name"
          onSearch={onSearch}
          loading={loading.searchBtn}
        />
        <CustomButton
          text="Update Schedules"
          type="outline"
          onClick={showEditModal}
          marginBottom="auto"
        />
      </Space>

      <CustomModal
        title="Create Schedules"
        visible={addModalVisible}
        onCancel={onAddFormModalCancel}
      >
        <AddSchedulesForm />
      </CustomModal>

      <CustomModal
        title="Update Train Schedules"
        visible={editModalVisible}
        onCancel={onEditFormModalCancel}
      >
        <UpdateSchedulesForm
          closeForm={() => setEditModalVisible(false)}
          reloadTableData={onSearch}
        />
      </CustomModal>

      <Table
        bordered
        dataSource={schedules}
        size="middle"
        columns={columns}
        scroll={{ y: 350 }}
        components={
          schedules?.length < 1 && {
            body: {
              wrapper: () => EmptyBox(notFoundMssg, showAddModal),
            },
          }
        }
        loading={loading.table}
        rowKey={(record) => record._id}
      />
    </div>
  );
}

export default SchedulesList;
