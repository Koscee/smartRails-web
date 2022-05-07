import React, { useState, useContext } from 'react';
import { Table } from 'antd';
import CustomModal from '../CustomModal';
import UpdateRouteForm from './UpdateRouteForm';
import AddRouteForm from './AddRouteForm';
import defineRouteTableColumns from './routeTableColums';
import { AuthContext } from '../../contexts/AuthContext';
import { RouteContext } from '../../contexts/RouteContex';
import { deleteRoute } from '../../actions/routeActions';
import { AddButton } from '../buttons';
import LoadingSpinner from '../LoadingSpinner';
import { isSuperAdmin } from '../../utils/permissionCheck';

function RoutesList() {
  const { routes, stations, dispatch } = useContext(RouteContext);
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
    deleteRoute(dispatch, id);
  };

  const columns = defineRouteTableColumns(
    hasRoleSuperAdmin,
    routes,
    stations,
    showEditModal,
    setSelectedItem,
    handleDelete
  ).flat();

  return routes?.length < 1 ? (
    <LoadingSpinner />
  ) : (
    <div>
      {hasRoleSuperAdmin && (
        <AddButton text="Add Route" onClick={showAddModal} />
      )}

      <CustomModal
        title="Add New Route"
        visible={addModalVisible}
        onCancel={onAddFormModalCancel}
      >
        <AddRouteForm stations={stations} />
      </CustomModal>

      <CustomModal
        title="Update Route"
        visible={editModalVisible}
        onCancel={onEditFormModalCancel}
      >
        <UpdateRouteForm
          routeId={selectedItem?._id}
          stations={stations}
          closeForm={() => setEditModalVisible(false)}
        />
      </CustomModal>

      <Table
        bordered
        dataSource={routes}
        columns={columns}
        scroll={{ y: 350 }}
        rowKey={(record) => record._id}
      />
    </div>
  );
}

export default RoutesList;
