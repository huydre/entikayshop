import React from 'react'
import { Col, Row, Container } from 'reactstrap';
import { Table, Tooltip, Avatar, Button, Link, Popover } from '@nextui-org/react';
import { DeleteIcon } from '../components/Icon/DeleteIcon';
import useGetData from '../custom-hooks/useGetData';
import { db } from '../firebase.config';
import { doc, deleteDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { EditIcon } from '../components/Icon/Editcon';
import { StyledBadge } from '../components/StyledBagde';

const AllProducts = () => {
  const navigate = useNavigate()
  const {data:productsData} = useGetData('products');

  const deleteProduct = async(id) => {
    await deleteDoc(doc(db,'products', id))
    toast.success('Xoá sản phẩm thành công!')
  }


  const columns = [
      { name: "Image", uid: "imgUrl" },
      { name: "Sản phẩm", uid: "productName" },
      { name: "Danh mục", uid: "category" },
      { name: "Tình trạng", uid: "status" },
      { name: "Giá", uid: "price" },
      { name: "Delete", uid: "id" },
    ];
  const renderCell = (product, columnKey) => {
      const cellValue = product[columnKey];
      switch (columnKey) {
          case "imgUrl":
              return (
                <Avatar src={cellValue} size='xl' squared/>
              );
          case "productName": 
              return (
                  <div>{cellValue}</div>
              );
          case "price":
              return (
                  <div>{Number(cellValue).toLocaleString("en")}đ</div>
              );
          case "category":
              return (
                  <div>{cellValue}</div>
              );
            case "status":
              return (
                  <StyledBadge type={cellValue}>{cellValue}</StyledBadge>
              );
          case "id":
              return (
                  <div className='flex justify-center space-x-2'>
                    <Tooltip content='Chỉnh sửa sản phẩm' color='invert'>
                        <Link href={`/dashboard/edit-product/${cellValue}`} ><EditIcon size={20} fill="#979797" /></Link>
                    </Tooltip>
                    {/* <Tooltip content='Xoá sản phẩm này?' color='error'>
                        <div onClick={() => {deleteProduct(cellValue)}}><DeleteIcon size={20} fill="#FF0080" /></div>
                    </Tooltip> */}
                    <div>
                        <Popover>
                                <Popover.Trigger>
                                    <button>
                                        <DeleteIcon size={20} fill="#FF0080" />
                                    </button>
                                </Popover.Trigger>
                                <Popover.Content>
                                    <div>
                                        <Container className='max-w-[330px] space-y-2 p-2'>
                                            <h4 className='text-center font-semibold'>Xác nhận</h4>
                                            <h5 className='text-sm'>Bạn chắc chắn muốn xoá sản phẩm này khỏi hệ thống? Dữ liệu sẽ không thể khôi phục khi bạn xoá!</h5>
                                            <div className='flex justify-around items-center'>
                                                <Button light size='sm'>Huỷ</Button>
                                                <Button shadow size='sm' color='error' onClick={() => {deleteProduct(cellValue)}}>Xoá</Button>
                                            </div>
                                        </Container>
                                    </div>
                                </Popover.Content>
                            </Popover>
                        </div>
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
                          <div className='flex justify-end pb-4'>
                            <Button className='bg-black' size='lg' onClick={() => {navigate('/dashboard/add-products')}} auto>Thêm sản phẩm</Button>
                          </div>
                            <Table className='w-full z-0'
                                    selectionMode='multiple'>
                                <Table.Header columns={columns}>
                                    {(column) => (
                                        <Table.Column key={column.uid} hideHeader={column.uid === 'id' || column.uid === 'imgUrl'}>
                                            {column.name}
                                        </Table.Column>
                                    )}
                                </Table.Header>

                                <Table.Body items={productsData}>
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

export default AllProducts