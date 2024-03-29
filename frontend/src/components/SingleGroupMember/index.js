import { deleteGroupMember, putGroupMember } from "../../store/groupReducer";
import { useDispatch } from 'react-redux'
import "./SingleGroupMember.css"
import { useState } from "react";

const SingleGroupMember = ({ props }) => {
    const dispatch = useDispatch();
    const [member, viewerStatus, organizerId, status] = props;
    const [processing, setProcessing] = useState(false)

    const handleDelete = async () => {
        const res = await dispatch(deleteGroupMember(member.groupId, member.id, organizerId))
        if (res) {
            setProcessing(false)
        }
    }

    const handleApproval = async (status) => {
        const res = await dispatch(putGroupMember(member.groupId, member.id, status))
        if (res) {
            setProcessing(false)
        }
    }

    return (
        (member.firstName && member.lastName) ?
            <div className="single-group-member-container">
                <div className="single-group-member-info">
                    <div className='group-member-circle'>
                        <div className='group-member-circle-inner'>
                            {member.firstName.split("")[0]}
                        </div>
                    </div>
                    <div>
                        {member.firstName} {member.lastName} ({status})
                    </div>
                </div>
                {(viewerStatus && viewerStatus !== 'pending' && viewerStatus !== 'member') &&
                    <div className="single-group-member-options">
                        {status === 'pending' &&
                            <div className="single-group-approve-option" onClick={() => {
                                handleApproval('member')
                                setProcessing(true)
                            }}>Approve</div>
                        }
                        {(status !== 'pending' && status !== 'host' && status !== 'co-host') &&
                            <div className="single-group-approve-option" onClick={() => {
                                handleApproval('co-host')
                                setProcessing(true)
                            }}>Make co-host</div>
                        }
                        {(status === 'co-host') &&
                            <div className="single-group-approve-option" onClick={() => {
                                handleApproval('member')
                                setProcessing(true)
                            }}>Remove co-host</div>
                        }
                        {status !== 'host' &&
                            <div className="single-group-remove-option" onClick={() => {
                                handleDelete()
                                setProcessing(true)
                            }}>Remove</div>
                        }
                    </div>
                }
            </div>
            :
            <></>
    )
}

export default SingleGroupMember
