import React, { useState, useContext } from 'react';
import { Table } from 'antd';
import { AuthContext } from '../../contexts/AuthContext';
import { StationContext } from '../../contexts/StationContex';
import defineStationTableColumns from './stationTableColumns';
import AddStationForm from './AddStationForm';
import UpdateStationForm from './UpdateStationForm';
import { deleteStation } from '../../actions/stationActions';
import CustomModal from '../CustomModal';
import { AddButton } from '../buttons';
import LoadingSpinner from '../LoadingSpinner';
import { isSuperAdmin } from '../../utils/permissionCheck';

function StationsList() {
  const { stations, cities, dispatch } = useContext(StationContext);
  const { authData } = useContext(AuthContext);
  const { user } = authData;
  const hasRoleSuperAdmin = isSuperAdmin(user.role);

  const [addModalVisible, setAddModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});

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

  const handleDelete = (id) => {
    deleteStation(dispatch, id);
  };

  const columns = defineStationTableColumns(
    hasRoleSuperAdmin,
    stations || [],
    showEditModal,
    setSelectedItem,
    handleDelete
  ).flat();

  return !stations ? (
    <LoadingSpinner />
  ) : (
    <div>
      {hasRoleSuperAdmin && (
        <AddButton text="Add Station" onClick={showAddModal} />
      )}

      <CustomModal
        title="Add New Station"
        visible={addModalVisible}
        onCancel={onAddFormModalCancel}
      >
        <AddStationForm cities={cities} />
      </CustomModal>

      <CustomModal
        title="Update Station"
        visible={editModalVisible}
        onCancel={onEditFormModalCancel}
      >
        <UpdateStationForm
          stationId={selectedItem?._id}
          cities={cities}
          closeForm={setEditModalVisible}
        />
      </CustomModal>

      <Table
        bordered
        size="middle"
        dataSource={stations}
        columns={columns}
        scroll={{ y: 350 }}
        rowKey={(record) => record._id}
      />
    </div>
  );
}

export default StationsList;
