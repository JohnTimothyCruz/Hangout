import "./SingleGroupMember.css"

const SingleGroupMember = ({ props }) => {
    const [member, user] = props;

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
                <div>Remove</div>
                <div>Approve</div>
            </div>
        </div>
    )
}

export default SingleGroupMember
