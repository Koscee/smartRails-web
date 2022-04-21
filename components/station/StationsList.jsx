import React, { useState, useContext } from 'react';
import { Table } from 'antd';
import { StationContext } from '../../contexts/StationContex';
import defineStationTableColumns from './stationTableColumns';
import AddStationForm from './AddStationForm';
import UpdateStationForm from './UpdateStationForm';
import { deleteStation } from '../../actions/stationActions';
import CustomModal from '../CustomModal';
import { AddButton } from '../buttons';
import LoadingSpinner from '../LoadingSpinner';

function StationsList() {
  const { stations, cities, dispatch } = useContext(StationContext);

  const [addModalVisible, setAddModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});

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

  const handleDelete = (id) => {
    console.log(id);
    deleteStation(dispatch, id);
    // stations.filter((item) => item._id !== id);
  };

  const columns = defineStationTableColumns(
    stations,
    showEditModal,
    setSelectedItem,
    handleDelete
  );

  return stations?.length < 1 ? (
    <LoadingSpinner />
  ) : (
    <div>
      <AddButton text="Add Station" onClick={showAddModal} />

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
