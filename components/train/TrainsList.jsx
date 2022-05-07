import React, { useState, useContext } from 'react';
import { Table } from 'antd';
import CustomModal from '../CustomModal';
import { AddButton } from '../buttons';
import LoadingSpinner from '../LoadingSpinner';
import { AuthContext } from '../../contexts/AuthContext';
import { TrainContext } from '../../contexts/TrainContext';
import { deleteTrain } from '../../actions/trainActions';
import defineTrainTableColumns from './trainTableColumns';
import AddTrainForm from './AddTrainForm';
import UpdateTrainForm from './UpdateTrainForm';
import { isSuperAdmin } from '../../utils/permissionCheck';

function TrainsList() {
  const { trains, trainTypes, dispatch } = useContext(TrainContext);
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
    deleteTrain(dispatch, id);
  };

  const columns = defineTrainTableColumns(
    hasRoleSuperAdmin,
    trains,
    trainTypes,
    showEditModal,
    setSelectedItem,
    handleDelete
  ).flat();

  return trains?.length < 1 ? (
    <LoadingSpinner />
  ) : (
    <div>
      {hasRoleSuperAdmin && (
        <AddButton text="Add Train" onClick={showAddModal} />
      )}

      <CustomModal
        title="Add New Train"
        visible={addModalVisible}
        onCancel={onAddFormModalCancel}
      >
        <AddTrainForm />
      </CustomModal>

      <CustomModal
        title="Update Train"
        visible={editModalVisible}
        onCancel={onEditFormModalCancel}
      >
        <UpdateTrainForm
          trainId={selectedItem?._id}
          closeForm={() => setEditModalVisible(false)}
        />
      </CustomModal>

      <Table
        bordered
        dataSource={trains}
        size="middle"
        columns={columns}
        scroll={{ y: 350 }}
        rowKey={(record) => record._id}
      />
    </div>
  );
}

export default TrainsList;
