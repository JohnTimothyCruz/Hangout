import "./SingleGroupMember.css"

const SingleGroupMember = ({ props }) => {
    const [member, user, status] = props;

    const handleDelete = () => {

    }

    const handleApproval = () => {

    }

    return (
        <div className="single-group-member-container">
            <div className="single-group-member-info">
                <div className='group-member-circle'>
                    <div className='group-member-circle-inner'>
                        {member.firstName.split("")[0]}
                    </div>
                </div>
                <div>
                    {member.firstName} {member.lastName}
                </div>
            </div>
            <div className="single-group-member-options">
                {status === 'pending' &&
                    <div className="single-group-approve-option" onClick={() => handleApproval()}>Approve</div>
                }
                <div className="single-group-remove-option" onClick={() => handleApproval()}>Remove</div>
            </div>
        </div>
    )
}

export default SingleGroupMember
