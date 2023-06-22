import React,{useState,useEffect} from 'react'
import { getAllPost } from './fetchApi'
import { Table,Space,  Upload,Button, Modal, } from 'antd'
import LoadingComponent from "../loading/LoadingComponent"
import AddPost from "./addPost"
import UpdatePostModal from './updatePost'
import "./style.css"

const { Column, ColumnGroup } = Table;
const AllPost = () => {
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [posts,setPost] = useState()
    const [loading,setLoading] = useState(true)
    const [isId,setIsId] = useState(null)

    useEffect(()=>{
        fetchData()
    },[])
  
    const fetchData = async () =>{
        let response = await getAllPost()
        if(response){
            setPost(response)
            setLoading(false)
        }
        else{
            console.log("khong thanh cong")
        }
    }

    console.log(posts)
    const showModal = (id) => {
        setIsId(id);
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
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
            <Button type="primary" onClick={showModal}>
                    Thêm bài viết
            </Button>
            <Modal title="Bài viêt mới" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <AddPost />
        </Modal>
        </div>
        <Table dataSource={posts} key={posts?.map(item=>item._id)}>

            <Column title="Tiêu đề" dataIndex="title" key="title" />
            <Column title="Nội dung" dataIndex="content" key="content" />
            <Column title="Tác giả" dataIndex="author" key="author" />
            <Column
            title="Action"
            key="action"
            render={(item) => (
                <Space size="middle" >
                    <Button type="primary" onClick={()=>showModal(item._id) }>
                        sửa
                    </Button>
                    <Modal title="Bài viêt mới" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                            <UpdatePostModal postId={isId} posts={item}/>
                    </Modal>
                    <Button danger >Xóa</Button>
                </Space>
            )}
            
            />
        </Table>
    </div>
  )
}

export default AllPost