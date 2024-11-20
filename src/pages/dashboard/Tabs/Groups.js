// import React, { useState, useEffect, useCallback } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { withTranslation } from 'react-i18next';
// import { Button, Modal, ModalHeader, ModalBody, ModalFooter, UncontrolledTooltip, Form, Label,
//     Input, Collapse, CardHeader, CardBody, Alert, InputGroup, Card, Badge } from 'reactstrap';
// import { Link } from "react-router-dom";
// import SimpleBar from "simplebar-react";
// import SelectContact from "../../../components/SelectContact";
// import { fetchGroups, createGroupRequest } from '../../../redux/actions';

// const Groups = (props) => {
//     const { t } = props; // Get t from props only once
//     const dispatch = useDispatch();
//     const { groups, loading, error } = useSelector(state => state.Chat);

//     const [modal, setModal] = useState(false);
//     const [isOpenCollapse, setIsOpenCollapse] = useState(false);
//     const [selectedContact, setSelectedContact] = useState([]);
//     const [isOpenAlert, setIsOpenAlert] = useState(false);
//     const [message, setMessage] = useState("");
//     const [groupName, setGroupName] = useState("");
//     const [groupDesc, setGroupDesc] = useState("");
//     const [cover, setCover] = useState("");
//     const [admin, setAdmin] = useState("adminUserId");
//     const [visibility, setVisibility] = useState("public");
//     const [type, setType] = useState("group");

//     useEffect(() => {
//         dispatch(fetchGroups());
//     }, [dispatch]);

//     const toggle = () => setModal(!modal);
//     const toggleCollapse = () => setIsOpenCollapse(!isOpenCollapse);

//     const createNewGroup = useCallback(() => {
//         if (selectedContact.length > 2) {
//             const serverData = {
//                 name: `#${groupName}`,  // Fixed: Added backticks
//                 cover: cover ? cover.name : "default-cover.png",
//                 admin: admin,
//                 members: selectedContact.map(contact => contact.id.toString()),
//                 visibility: visibility || "PUBLIC",
//                 type: type,
//                 description: groupDesc
//             };
            
//             dispatch(createGroupRequest(serverData));
//             toggle();
//         } else {
//             setMessage(selectedContact.length === 1 ? "Minimum 2 members required!!!" : "Please Select Members!!!");
//             setIsOpenAlert(true);
//             setTimeout(() => setIsOpenAlert(false), 3000);
//         }
//     }, [selectedContact, groupName, cover, admin, visibility, type, groupDesc, dispatch]);
//     const handleCheck = (e, contactId) => {
//         if (e.target.checked) {
//             setSelectedContact(prev => [...prev, { id: contactId, name: e.target.value }]);
//         } else {
//             setSelectedContact(prev => prev.filter(contact => contact.id !== contactId));
//         }
//     };

//     if (loading) {
//         return <div className="p-4">Loading groups...</div>;
//     }

//     // Rest of your component JSX remains the same...
//     return (
//         <React.Fragment>
//             <div>
//                 <div className="p-4">
//                     <div className="user-chat-nav float-end">
//                         <div id="create-group">
//                             <Button onClick={toggle} type="button" color="link" className="text-decoration-none text-muted font-size-18 py-0">
//                                 <i className="ri-group-line me-1"></i>
//                             </Button>
//                         </div>
//                         <UncontrolledTooltip target="create-group" placement="bottom">
//                             {t('Create group')}
//                         </UncontrolledTooltip>
//                     </div>
//                     <h4 className="mb-4">{t('Groups')}</h4>

//                     <Modal isOpen={modal} centered toggle={toggle}>
//                         <ModalHeader tag="h5" className="modal-title font-size-14" toggle={toggle}>{t('Create New Group')}</ModalHeader>
//                         <ModalBody className="p-4">
//                             <Form>
//                                 <div className="mb-4">
//                                     <Label className="form-label" htmlFor="addgroupname-input">{t('Group Name')}</Label>
//                                     <Input type="text" className="form-control" id="addgroupname-input" value={groupName} onChange={(e) => setGroupName(e.target.value)} placeholder="Enter Group Name" />
//                                 </div>
//                                 <div className="mb-4">
//                                     <Label className="form-label">{t('Group Members')}</Label>
//                                     <Alert isOpen={isOpenAlert} color="danger">
//                                         {message}
//                                     </Alert>
//                                     <div className="mb-3">
//                                         <Button color="light" size="sm" type="button" onClick={toggleCollapse}>
//                                             {t('Select Members')}
//                                         </Button>
//                                     </div>

//                                     <Collapse isOpen={isOpenCollapse} id="groupmembercollapse">
//                                         <Card className="border">
//                                             <CardHeader>
//                                                 <h5 className="font-size-15 mb-0">{t('Contacts')}</h5>
//                                             </CardHeader>
//                                             <CardBody className="p-2">
//                                                 <SimpleBar style={{ maxHeight: "150px" }}>
//                                                     <div id="addContacts">
//                                                         <SelectContact handleCheck={handleCheck} />
//                                                     </div>
//                                                 </SimpleBar>
//                                             </CardBody>
//                                         </Card>
//                                     </Collapse>
//                                 </div>

//                                 <div className="mb-4">
//                                     <Label className="form-label" htmlFor="cover-input">Cover Image</Label>
//                                     <Input type="file" className="form-control" id="cover-input" onChange={(e) => setCover(e.target.files[0])} />
//                                 </div>

//                                 <div className="mb-4">
//                                     <Label className="form-label" htmlFor="visibility-select">Visibility</Label>
//                                     <Input type="select" className="form-control" id="visibility-select" value={visibility} onChange={(e) => setVisibility(e.target.value)}>
//                                         <option value="public">Public</option>
//                                         <option value="private">Private</option>
//                                     </Input>
//                                 </div>

//                                 <div className="mb-4">
//                                     <Label className="form-label" htmlFor="type-select">Type</Label>
//                                     <Input type="select" className="form-control" id="type-select" value={type} onChange={(e) => setType(e.target.value)}>
//                                         <option value="group">Group</option>
//                                         <option value="duo">Channel</option>
//                                     </Input>
//                                 </div>

//                                 <div>
//                                     <Label className="form-label" htmlFor="addgroupdescription-input">Description</Label>
//                                     <textarea className="form-control" id="addgroupdescription-input" value={groupDesc} onChange={(e) => setGroupDesc(e.target.value)} rows="3" placeholder="Enter Description"></textarea>
//                                 </div>
//                             </Form>
//                         </ModalBody>
//                         <ModalFooter>
//                             <Button type="button" color="link" onClick={toggle}>{t('Close')}</Button>
//                             <Button type="button" color="primary" onClick={createNewGroup}>Create Group</Button>
//                         </ModalFooter>
//                     </Modal>
//                     <div className="search-box chat-search-box">
//                         <InputGroup size="lg" className="bg-light rounded-lg">
//                             <Button color="link" className="text-decoration-none text-muted pr-1" type="button">
//                                 <i className="ri-search-line search-icon font-size-18"></i>
//                             </Button>
//                             <Input type="text" className="form-control bg-light" placeholder="Search groups..." />
//                         </InputGroup>
//                     </div>
//                 </div>

//                 <SimpleBar style={{ maxHeight: "100%" }} className="p-4 chat-message-list chat-group-list">
//                     <ul className="list-unstyled chat-list">
//                     {Array.isArray(groups) && groups.map((group, key) => (
//     <li key={group._id || key}>
//         <Link to="#">
//             <div className="d-flex align-items-center">
//                 <div className="chat-user-img me-3 ms-0">
//                     <div className="avatar-xs">
//                         <span className="avatar-title rounded-circle bg-soft-primary text-primary">
//                             {group.name.charAt(1)}
//                         </span>
//                     </div>
//                 </div>
//                 <div className="flex-grow-1 overflow-hidden">
//                     <h5 className="text-truncate font-size-14 mb-0">
//                         {group.name}
//                         {group.unRead > 0 && (
//                             <Badge color="none" pill className="badge-soft-danger float-end">
//                                 {group.unRead >= 20 ? `${group.unRead}+` : group.unRead}
//                             </Badge>
//                         )}
//                         {group.isNew && <Badge color="none" pill className="badge-soft-danger float-end">New</Badge>}
//                     </h5>
//                 </div>
//             </div>
//         </Link>
//     </li>
// ))}
//                     </ul>
//                 </SimpleBar>
//             </div>
//         </React.Fragment>
//     );
// };

// const mapStateToProps = (state) => ({
//     active_user: state.Chat.active_user
// });

// export default withTranslation()(Groups);

   
import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, UncontrolledTooltip, Form, Label, Input, Collapse, CardHeader, CardBody, Alert, InputGroup, Card, Badge } from 'reactstrap';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withTranslation } from 'react-i18next';
import SimpleBar from "simplebar-react";
import SelectContact from "../../../components/SelectContact";
import { createGroupRequest } from "../../../redux/actions";

const Groups = ({ t, groups, createGroupRequest }) => {
    const [groupName, setGroupName] = useState("");
    const [cover, setCover] = useState(null);
    const [visibility, setVisibility] = useState("public");
    const [type, setType] = useState("group");
    const [groupDesc, setGroupDesc] = useState("");
    const [selectedContact, setSelectedContact] = useState([]);
    const [isOpenAlert, setIsOpenAlert] = useState(false);
    const [message, setMessage] = useState("");
    const [modal, setModal] = useState(false);
    const [isOpenCollapse, setIsOpenCollapse] = useState(false);

    const toggle = () => setModal(!modal);
    const createNewGroup = () => {
        // Check if there are at least 2 members selected
        if (selectedContact.length >= 2) {
            const groupData = {
                name: groupName,
                cover: cover ? URL.createObjectURL(cover) : null,
                admin: "admin-id-placeholder", // Replace with actual admin ID
                members: selectedContact.map(contact => contact.id.toString()),
                visibility,
                type,
            };
            console.log("members ",groupData.members )

    
            createGroupRequest(groupData); // Dispatch the Redux action
            toggle(); // Close the modal
        } else {
            // If there are fewer than 2 members selected, show the error message
            setMessage("Minimum 2 members required!!!");
            setIsOpenAlert(true);
            
            // Automatically close the alert after 3 seconds
            setTimeout(() => {
                setIsOpenAlert(false);
            }, 3000);
        }
    };
    const handleCheck = (e, contactId) => {
        const { checked, value } = e.target;
        setSelectedContact(prevContacts => {
            if (checked) {
                // Add contact if checked
                return [...prevContacts, { id: contactId, name: value }];
            } else {
                // Remove contact if unchecked
                return prevContacts.filter(contact => contact.id !== contactId);
            }
        });
    };

    useEffect(() => {
    }, [selectedContact]);

    const toggleCollapse = () => setIsOpenCollapse(!isOpenCollapse);

    return (
        <React.Fragment>
            <div className="p-4">
                <div className="user-chat-nav float-end">
                    <Button onClick={toggle} type="button" color="link" className="text-decoration-none text-muted font-size-18 py-0" id="create-group">
                        <i className="ri-group-line me-1"></i>
                    </Button>
                    <UncontrolledTooltip target="create-group" placement="bottom">
                        {t('Create group')}
                    </UncontrolledTooltip>
                </div>
                <h4 className="mb-4">{t('Groups')}</h4>

                <Modal isOpen={modal} centered toggle={toggle}>
                    <ModalHeader tag="h5" className="modal-title font-size-14" toggle={toggle}>{t('Create New Group')}</ModalHeader>
                    <ModalBody className="p-4">
                        <Form>
                            <div className="mb-4">
                                <Label className="form-label" htmlFor="addgroupname-input">{t('Group Name')}</Label>
                                <Input
                                    type="text"
                                    className="form-control"
                                    id="addgroupname-input"
                                    value={groupName}
                                    onChange={(e) => setGroupName(e.target.value)}
                                    placeholder="Enter Group Name"
                                />
                            </div>
                            <div className="mb-4">
                                <Label className="form-label">{t('Group Members')}</Label>
                                <Alert isOpen={isOpenAlert} color="danger">
                                    {message}
                                </Alert>
                                <Button color="light" size="sm" type="button" onClick={toggleCollapse}>
                                    {t('Select Members')}
                                </Button>
                                <Collapse isOpen={isOpenCollapse}>
                                    <Card className="border">
                                        <CardHeader>
                                            <h5 className="font-size-15 mb-0">{t('Contacts')}</h5>
                                        </CardHeader>
                                        <CardBody className="p-2">
                                            <SimpleBar style={{ maxHeight: "150px" }}>
                                                <SelectContact handleCheck={handleCheck} />
                                            </SimpleBar>
                                        </CardBody>
                                    </Card>
                                </Collapse>
                            </div>
                            <div className="mb-4">
                                <Label className="form-label" htmlFor="cover-input">Cover Image</Label>
                                <Input
                                    type="file"
                                    className="form-control"
                                    id="cover-input"
                                    onChange={(e) => setCover(e.target.files[0])}
                                />
                            </div>
                            <div className="mb-4">
                                <Label className="form-label" htmlFor="visibility-select">Visibility</Label>
                                <Input
                                    type="select"
                                    className="form-control"
                                    id="visibility-select"
                                    value={visibility}
                                    onChange={(e) => setVisibility(e.target.value)}
                                >
                                    <option value="public">Public</option>
                                    <option value="private">Private</option>
                                </Input>
                            </div>
                            <div className="mb-4">
                                <Label className="form-label" htmlFor="type-select">Type</Label>
                                <Input
                                    type="select"
                                    className="form-control"
                                    id="type-select"
                                    value={type}
                                    onChange={(e) => setType(e.target.value)}
                                >
                                    <option value="group">Group</option>
                                    <option value="duo">Channel</option>
                                </Input>
                            </div>
                            <div>
                                <Label className="form-label" htmlFor="addgroupdescription-input">Description</Label>
                                <textarea
                                    className="form-control"
                                    id="addgroupdescription-input"
                                    value={groupDesc}
                                    onChange={(e) => setGroupDesc(e.target.value)}
                                    rows="3"
                                    placeholder="Enter Description"
                                ></textarea>
                            </div>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button type="button" color="link" onClick={toggle}>{t('Close')}</Button>
                        <Button type="button" color="primary" onClick={createNewGroup}>Create Group</Button>
                    </ModalFooter>
                </Modal>
                <div className="search-box chat-search-box">
                    <InputGroup size="lg" className="bg-light rounded-lg">
                        <Button color="link" className="text-decoration-none text-muted pr-1" type="button">
                            <i className="ri-search-line search-icon font-size-18"></i>
                        </Button>
                        <Input type="text" className="form-control bg-light" placeholder="Search groups..." />
                    </InputGroup>
                </div>
            </div>

            <SimpleBar style={{ maxHeight: "100%" }} className="p-4 chat-message-list chat-group-list">
                <ul className="list-unstyled chat-list">
                    {Array.isArray(groups) && groups.map((group) => (
                        <li key={group._id}>
                            <Link to="#">
                                <div className="d-flex align-items-center">
                                    <div className="chat-user-img me-3 ms-0">
                                        <div className="avatar-xs">
                                            <span className="avatar-title rounded-circle bg-soft-primary text-primary">
                                                {group.name.charAt(0)}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex-grow-1 overflow-hidden">
                                        <h5 className="text-truncate font-size-14 mb-0">
                                            {group.name}
                                            {group.unRead > 0 && (
                                                <Badge color="none" pill className="badge-soft-danger float-end">
                                                    {group.unRead >= 20 ? `${group.unRead}+` : group.unRead}
                                                </Badge>
                                            )}
                                            {group.isNew && <Badge color="none" pill className="badge-soft-danger float-end">New</Badge>}
                                        </h5>
                                    </div>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
            </SimpleBar>
        </React.Fragment>
    );
};

const mapStateToProps = (state) => {
    const { groups, active_user } = state.Chat;
    return { groups, active_user };
};

export default connect(mapStateToProps, { createGroupRequest })(withTranslation()(Groups));