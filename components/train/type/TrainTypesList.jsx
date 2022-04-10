import React, { useState, useContext } from 'react';
import { Table } from 'antd';
import CustomModal from '../../CustomModal';
import { AddButton } from '../../buttons';
import LoadingSpinner from '../../LoadingSpinner';
import { TrainTypeContext } from '../../../contexts/TrainTypeContex';
import { deleteTrainType } from '../../../actions/trainTypeAction';
import defineTrainTypeTableColumns from './trainTypeTableColumns';
import AddTrainTypeForm from './AddTrainTypeForm';
import UpdateTrainTypeForm from './UpdateTrainTypeForm';

function TrainTypesList() {
  const { trainTypes, dispatch } = useContext(TrainTypeContext);

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
    deleteTrainType(dispatch, id);
  };

  const columns = defineTrainTypeTableColumns(
    trainTypes,
    showEditModal,
    setSelectedItem,
    handleDelete
  );

  return trainTypes?.length < 1 ? (
    <LoadingSpinner />
  ) : (
    <div>
      <AddButton text="Add type" onClick={showAddModal} />

      <CustomModal
        title="Add New Train Class"
        visible={addModalVisible}
        onCancel={onAddFormModalCancel}
      >
        <AddTrainTypeForm />
      </CustomModal>

      <CustomModal
        title="Update Train Class"
        visible={editModalVisible}
        onCancel={onEditFormModalCancel}
      >
        <UpdateTrainTypeForm
          trainTypeId={selectedItem?._id}
          closeForm={() => setEditModalVisible(false)}
        />
      </CustomModal>

      <Table
        bordered
        dataSource={trainTypes}
        size="middle"
        columns={columns}
        scroll={{ y: 350 }}
        rowKey={(record) => record._id}
      />
    </div>
  );
}

export default TrainTypesList;