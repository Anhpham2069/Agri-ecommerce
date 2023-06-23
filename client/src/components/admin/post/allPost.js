import React,{useState,useEffect} from 'react'
import { deletePost, getAllPost } from './fetchApi'
import moment from 'moment'
import { Table,Space,  Upload,Button, Modal,message } from 'antd'
import {ExclamationCircleFilled,PlusSquareOutlined} from "@ant-design/icons"
import LoadingComponent from "../loading/LoadingComponent"
import AddPost from "./addPost"
import UpdatePostModal from './updatePost'
import "./style.css"

const { Column, ColumnGroup } = Table;
const { confirm } = Modal;
const AllPost = () => {
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalAddOpen, setIsModalAddOpen] = useState(false);
    const [posts,setPost] = useState()
    const [loading,setLoading] = useState(true)
    const [isId,setIsId] = useState(null)
    const [selectedPost, setSelectedPost] = useState(null);

    useEffect(()=>{
        fetchData()
    },[])
  
    const fetchData = async () =>{
        setLoading(false)
        let response = await getAllPost()
        console.log(response)
        if(response){
            setPost(response)
        }
        else{
            console.log("khong thanh cong")
        }
    }
    const deleteP = async (pId) =>{
        let res = await deletePost(pId)
        console.log(res)
        if(res.success){
            console.log("thanh cong")
            // message.success("xoa bai viet thanh cong")
        }else{
            console.log("khong thanh cong")

        }
    }
    console.log(selectedPost)
    const showModal = (id,item) => {
        setIsId(id);
        setSelectedPost(item)
        setIsModalOpen(true);
    };
    const showModalAdd = () => {
        setIsModalAddOpen(true);
    };
    const handleOk = () => {
        setIsModalAddOpen(false);
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalAddOpen(false);
        setIsModalOpen(false);
    };

    const showDeleteConfirm = (pId) => {
        confirm({
          title: 'Bạn chắc chắn muốn xóa sản phẩm này chứ',
          okText: 'Có',
          okType: 'danger',
          cancelText: 'Không',
          onOk() {
            deleteP(pId)
            message.success('Xóa sản phẩm thành công!');
          },
          onCancel() {
            console.log('Cancel');
          },
        });
      };



    if (loading) {
        return (
          <div className="flex items-center justify-center p-8">
            <LoadingComponent />
          </div>
        );
      }



  return (
    <div>
     
        <div className='add-post-btn'>
            <Button type="primary" onClick={showModalAdd}>
                <div className='add-btn'>
                    <PlusSquareOutlined /> &#160;<p>Thêm bài viết</p>
                </div>
            </Button>
            <Modal title="Bài viêt mới" open={isModalAddOpen} onOk={handleOk} onCancel={handleCancel}>
                <AddPost />
            </Modal>
        </div>
        <Table dataSource={posts} key={posts?.map(item=>item._id)}>
            <Column title="Tiêu đề" dataIndex="title" key="title" ellipsis= "true"/>
            <Column title="Nội dung" dataIndex="content" key="content"  ellipsis= "true" />
            <Column title="Tác giả" dataIndex="author" key="author" />
            <Column title="Ngày thêm" key="createdAt" 
                render={(post)=>(
                    moment(post.createdAt).format("lll")
                )}
            />
            <Column
            title="Action"
            key="action"
            render={(item) => (
                <Space size="middle" >
                    <Button type="primary" onClick={()=>showModal(item._id,item) }>
                        sửa
                    </Button>
                    <Modal title="Bài viêt mới" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                        {selectedPost &&
                            <UpdatePostModal postId={isId} 
                                postTitle={selectedPost.title}
                                postContent={selectedPost.content}
                                postAuthor={selectedPost.author}
                                postImg={selectedPost.image}
                            />
                        }
                    </Modal>
                    <Button danger onClick={()=>showDeleteConfirm(item._id)} >Xóa</Button>
                </Space>
            )}
            
            />
        </Table>
    </div>
  )
}

export default AllPost