import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import useGetData from '../custom-hooks/useGetData'
import { Table, Tooltip, Avatar } from '@nextui-org/react';
import { DeleteIcon } from '../components/Icon/DeleteIcon';
import { db } from '../firebase.config';
import { deleteDoc, doc } from 'firebase/firestore';
import { toast } from 'react-toastify';

const Users = () => {

  const {data: userData, loading} = useGetData('users')

  const deleteUser = async(id) => {
    await deleteDoc(doc(db,'users', id))
    toast.success('Xoá người dùng thành công!')
  }

  const columns = [
    { name: "Image", uid: "photoURL" },
    { name: "Tên người dùng", uid: "displayName" },
    { name: "Email", uid: "email" },
    { name: "Xoá người dùng?", uid: "id" },
  ];
  const renderCell = (product, columnKey) => {
      const cellValue = product[columnKey];
      switch (columnKey) {
          case "photoURL":
              return (
                <Avatar src={cellValue} size='lg' squared/>
              );
          case "displayName": 
              return (
                  <div>{cellValue}</div>
              );
          case "email":
              return (
                  <div>{cellValue}đ</div>
              );
          case "id":
              return (
                  <div className='flex justify-center'>
                      <Tooltip content='Bạn chắc chắn xoá người dùng này?' color='error'>
                          <div onClick={() => {deleteUser(cellValue)}}><DeleteIcon size={20} fill="#FF0080" /></div>
                      </Tooltip>
                  </div>
              );
          default:
              return cellValue;
      }
  };

  return (
    <section>
                <Container>
                    <Row>
                        <Col lg='9' className='w-full'>
                            <Table className='w-full z-0'
                                    selectionMode="none">
                                <Table.Header columns={columns}>
                                    {(column) => (
                                        <Table.Column key={column.uid} hideHeader={column.uid === 'id' || column.uid === 'photoURL'}>
                                            {column.name}
                                        </Table.Column>
                                    )}
                                </Table.Header>

                                <Table.Body items={userData}>
                                        {(item) => (
                                            <Table.Row>
                                                {(columnKey) => (
                                                    <Table.Cell>{renderCell(item, columnKey)}</Table.Cell>
                                                )}
                                            </Table.Row>
                                        )}
                                </Table.Body>

                            </Table>
                        </Col>
                        <Col lg='3'></Col>
                    </Row>
                </Container>
            </section>
  )
}

export default Users