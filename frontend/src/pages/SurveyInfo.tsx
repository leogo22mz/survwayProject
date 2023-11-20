import { Button, Input } from 'antd';
import { useNavigate } from "react-router-dom";
// import './Profile.css';

function SurveyInfo() {
  const navigate = useNavigate();

  return (
    <div className="profile-container">
      <h1>Survey Info</h1>
      <div className="form-container">
        <div className="avatar-placeholder"></div>
        <Input placeholder="Username" />
        <Input placeholder="Password" type="password" />
        <div>
          <Button className="log-button" onClick={() => navigate('/profile')}>Log In</Button>
          <Button className="sign-button" onClick={() => navigate('/signup')}>Sign Up</Button>
        </div>
      </div>
    </div>
  );
}

export default SurveyInfo;
