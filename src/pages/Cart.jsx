import React from 'react';
import Helmet from '../components/Helmet/Helmet';
import CommonSection from '../components/UI/CommonSection';
import { Container, Row, Col } from 'reactstrap';
import { Table, Avatar, Popover, Button } from '@nextui-org/react';
import { DeleteIcon } from '../components/Icon/DeleteIcon';
import { useDispatch, useSelector } from 'react-redux';
import { cartActions } from '../redux/slices/cartSlice';

const Cart = () => {

    const dispath = useDispatch()

    const cartItem = useSelector(state => state.cart.cartItems)

    const totalAmount = useSelector(state => state.cart.totalAmount)

    const deleteFromCart = (id) => {
        dispath(cartActions.deleteItem(id))
    }


    const columns = [
        { name: "Image", uid: "imgUrl" },
        { name: "Tên sản phẩm", uid: "productName" },
        { name: "Giá", uid: "price" },
        { name: "Số lượng", uid: "quantity" },
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
                    <div >{cellValue}</div>
                );
            case "price":
                return (
                    <div>{Number(cellValue).toLocaleString("en")}đ</div>
                );
            case "quantity":
                return (
                    <div className='text-center'>{cellValue}</div>
                );
            case "id":
                return (
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
                                        <h5 className='text-sm'>Bạn chắc chắn muốn xoá sản phẩm này khỏi giỏ hàng?</h5>
                                        <div className='flex justify-around items-center'>
                                            <Button light size='sm'>Huỷ</Button>
                                            <Button shadow size='sm' color='error' onClick={() => {deleteFromCart(cellValue)}}>Xoá</Button>
                                        </div>
                                    </Container>
                                </div>
                            </Popover.Content>
                        </Popover>
                    </div>
                );
            default:
                return cellValue;
        }
    };

    console.log(totalAmount)

    return (
        <Helmet title='Cart'>
            <CommonSection title={'Giỏ hàng của tôi'}/>
            <section>
                <Container>
                    <Row>
                        <Col lg='9'>
                            <Table className='w-full'
                                    selectionMode="none">
                                <Table.Header columns={columns}>
                                    {(column) => (
                                        <Table.Column key={column.uid} hideHeader={column.uid === 'id' || column.uid === 'imgUrl'}>
                                            {column.name}
                                        </Table.Column>
                                    )}
                                </Table.Header>

                                <Table.Body items={cartItem}>
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
                        <Col lg='3'>
                            <div className='shadow-md ring-1 ring-slate-900/5 rounded-xl space-y-6 text-sm py-6 px-2 flex flex-col'>
                                <div className='flex justify-between'>
                                    <div className='font-semibold'>Tổng giá trị sản phẩm</div>
                                    <div>{Number(totalAmount).toLocaleString("en")}</div>
                                </div>
                                <div className='flex justify-between'>
                                    <div className='font-semibold'>Giảm giá</div>
                                    <div>0</div>
                                </div>
                                <div className='my-2 h-[1px] bg-slate-200' />
                                <div className='flex justify-between'>
                                    <div className='font-semibold'>Tổng số tiền phải thanh toán</div>
                                    <div className='font-semibold'>{Number(totalAmount).toLocaleString("en")}</div>
                                </div>
                                <button className='bg-black text-sm py-3 shadow-lg rounded-lg w-full text-white font-semibold'>Thanh toán</button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </Helmet>
    )
}

export default Cart