import React from "react";

import UserLayout from '../../hoc/user';
import MyButtonEdit from '../utils/buttonEditNfo';
import moment from "moment";
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/fontawesome-free-solid';


import CircularProgress from '@material-ui/core/CircularProgress';
import UserHistoryBlock from '../utils/User/history_block';

const UserDashboard = ({ user }) => {

  if (!user || (user && (user.userData === null || user.userData === undefined))) {
    return <div className="main_loader">
      <CircularProgress style={{ color: '#2196F3' }} thickness={7} />
    </div>
  }

 var time = moment(user && user.userData ? user.userData.createdAt : null).fromNow(true)
 
 
if(user){
  return (
    


      <div>
        <UserLayout>
          <div style={{ width: "100%", display: "block" }}>
            <div className="user_nfo_panel">
              <h1>Welcome, {user && user.userData ? user.userData.name : null}!</h1>
            </div>

            <div className="user_history">
              <div className="user_nfo_panel"
                style=
                {{
                  float: 'left',
                  width: '50%', height: "140px"
                }}
              >
                <div>
                  <span>{user.userData ? user.userData.name : null}</span>
                  <span>{user.userData ? user.userData.lastname : null}</span>
                  <span>{user.userData ? user.userData.email : null}</span>
                  <MyButtonEdit
                    type="default"
                    title="Edit account info"
                    linkTo="/user/edit_user"
                  />
                </div>

              </div>


              <div className="user_nfo_panel"
                style=
                {{
                  float: 'right',
                  width: '37%', height: "140px"
                }}
              >
                <div align="center">
                  <span>Thank you for being with us for</span>
                  <span>{time}</span>
                  <FontAwesomeIcon icon={faCalendarAlt} className="calendar" />
                </div>
              </div>

            </div>

            {
              user.userData.history ?
                <div className="user_historyHistory">
                  <h2>History purchases</h2>
                  <div className="user_product_block_wrapper">
                    <UserHistoryBlock
                      products={user.userData.history}
                    />
                  </div>
                </div>
                : null
            }





          </div>

        </UserLayout>

      </div>

    );
  }

};

export default UserDashboard;
