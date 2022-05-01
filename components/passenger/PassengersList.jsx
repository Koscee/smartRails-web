import { Table } from 'antd';
import React, { useContext, useState } from 'react';
import { deletePassenger } from '../../actions/passengerActions';
import { PassengerContext } from '../../contexts/PassengerContext';
import LoadingSpinner from '../LoadingSpinner';
import { AddButton } from '../buttons';
import CustomModal from '../CustomModal';
import AddPassengerForm from './AddPassengerForm';
import UpdatePassengerForm from './UpdatePassengerForm';
import definePassengerTableColumns from './passengerTableColumns';

function PassengersList() {
  const { passengers, dispatch } = useContext(PassengerContext);

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
    deletePassenger(dispatch, id);
  };

  const columns = definePassengerTableColumns(
    passengers || [],
    showEditModal,
    setSelectedItem,
    handleDelete
  );

  return !passengers ? (
    <LoadingSpinner />
  ) : (
    <div>
      <AddButton text="Add Passenger" onClick={showAddModal} />

      <CustomModal
        title="Add New Passenger"
        visible={addModalVisible}
        onCancel={onAddFormModalCancel}
      >
        <AddPassengerForm dispatch={dispatch} checkAllFieldsTouched />
      </CustomModal>

      <CustomModal
        title="Update Passenger"
        visible={editModalVisible}
        onCancel={onEditFormModalCancel}
      >
        <UpdatePassengerForm
          passenger={selectedItem}
          closeForm={setEditModalVisible}
        />
      </CustomModal>

      <Table
        bordered
        size="middle"
        dataSource={passengers}
        columns={columns}
        scroll={{ y: 350, x: 1250 }}
        rowKey={(record) => record._id}
      />
    </div>
  );
}

export default PassengersList;
