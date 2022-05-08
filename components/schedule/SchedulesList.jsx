import { Button, Space, Table } from 'antd';
import React, { useState, useContext } from 'react';
import AddSchedulesForm from './AddSchedulesForm';
import UpdateSchedulesForm from './UpdateSchedulesForm';
import { CustomButton } from '../buttons';
import CustomModal from '../CustomModal';
import NoData from '../NoData';
import SearchInput from '../SearchInput';
import { AuthContext } from '../../contexts/AuthContext';
import defineSchedulesTableColumns from './schedulesTableColumns';
import { getSchedules } from '../../actions/scheduleActions';
import { isSuperAdmin } from '../../utils/permissionCheck';

function EmptyBox(mssg, hasRoleSuperAdmin, showAddModal) {
  return (
    <NoData description={mssg || 'No Data'}>
      {hasRoleSuperAdmin && (
        <Button type="primary" onClick={showAddModal}>
          Create Schedules
        </Button>
      )}
    </NoData>
  );
}

function SchedulesList() {
  const { authData } = useContext(AuthContext);
  const { user } = authData;
  const hasRoleSuperAdmin = isSuperAdmin(user.role);

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
    const foundSchedules = await getSchedules({ train_no: value });

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
    setAddModalVisible(false);
  };

  const showEditModal = () => {
    setEditModalVisible(true);
  };

  const onEditFormModalCancel = () => {
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
        {hasRoleSuperAdmin && (
          <CustomButton
            text="Update Schedules"
            type="outline"
            onClick={showEditModal}
            marginBottom="auto"
          />
        )}
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
              wrapper: () =>
                EmptyBox(notFoundMssg, hasRoleSuperAdmin, showAddModal),
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
