import React, { useState } from 'react';
import { Avatar, Button } from 'antd';
import { useNavigate } from 'react-router-dom';

function Profile() {
    const nav = useNavigate();
    const [imageUploaded, setImageUploaded] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [formVisible, setFormVisible] = useState(false);

    // Obtener datos del usuario del localStorage
    const nickname = localStorage.getItem('user_nickname');
    const email = localStorage.getItem('user_email');
    const userImage = localStorage.getItem('user_image');

    const handleChange = (info: any) => {
        const { fileList } = info;

        if (fileList.length > 0 && fileList[0].originFileObj) {
            setImageUploaded(true);
            setImageFile(fileList[0].originFileObj);
        } else {
            setImageUploaded(false);
            setImageFile(null);
        }
    };

    const handleEnterClick = () => {
        console.log('Image uploaded:', imageFile);
    };

    const logoutActions = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user_image');
        localStorage.removeItem('lastLoginTime');
        nav('/');
    };

    return (
        <div className="main-container">
            <div className='avatar'>
                {/* Mostrar la imagen de perfil */}
                <Avatar src={userImage} size={64} shape="circle" />
            </div>
            
            {/* Mostrar el nickname y el email */}
            <div>
                <p>Nickname: {nickname}</p>
                <p>Email: {email}</p>
            </div>

            {/* Agregar el botón "Enter" */}
            <Button
                type="primary"
                htmlType="submit"
                style={{ borderColor: 'black', backgroundColor: '#BBC0BA', color: 'white' }}
                onClick={handleEnterClick}
            >
                Enter
            </Button>

            {/* Aquí puedes agregar cualquier otro contenido necesario */}
            <div className="Group4">
                {/* ... */}
            </div>
        </div>
    );
}

export default Profile;
