import React from 'react';
import AdminPanelLayout from "../../../components/UI/Admin/AdminPanelLayout";
import {withAdminAuth} from "../../../lib/auth/adminAuth";
import PackmanSpinner from "../../../components/UI/Spinner/PackmanSpinner";

const AdminPanelPosts = (props) => {

    return (
        <AdminPanelLayout>
            { props.isPageLoading?
                <PackmanSpinner/>:
                <h1>Posts</h1>
            }
        </AdminPanelLayout>
    );
};

export default withAdminAuth(AdminPanelPosts)