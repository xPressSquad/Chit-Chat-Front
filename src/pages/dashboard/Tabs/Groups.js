
import React, { useState, useEffect } from 'react';
import {
    Button, Modal, ModalHeader, ModalBody, ModalFooter, UncontrolledTooltip,
    Form, Label, Input, Collapse, CardHeader, CardBody, Alert, InputGroup,
    Card, Badge, Dropdown, DropdownToggle, DropdownMenu, DropdownItem
} from 'reactstrap';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withTranslation } from 'react-i18next';
import SimpleBar from "simplebar-react";
import SelectContact from "../../../components/SelectContact";
import { createGroupRequest, fetchAllServers, deleteGroupRequest, updateGroupRequest } from "../../../redux/actions";
import { useDispatch } from 'react-redux';

const Groups = ({ t, groups, createGroupRequest, fetchAllServers, updateGroupRequest }) => {
    const [groupName, setGroupName] = useState("");
    const [cover, setCover] = useState(null);
    const [visibility, setVisibility] = useState("public");
    const [type, setType] = useState("group");
    const [groupDesc, setGroupDesc] = useState("");
    const [selectedContact, setSelectedContact] = useState([]);
    const [isOpenAlert, setIsOpenAlert] = useState(false);
    const [message, setMessage] = useState("");
    const [modal, setModal] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false); // New state for edit mode
    const [selectedGroupId, setSelectedGroupId] = useState(null); // New state for selected group ID
    const [isOpenCollapse, setIsOpenCollapse] = useState(false);
    const [activeGroupMenu, setActiveGroupMenu] = useState(null);

    const toggleGroupMenu = (groupId) => {
        setActiveGroupMenu(activeGroupMenu === groupId ? null : groupId);
    };

    const dispatch = useDispatch();
    useEffect(() => {
        fetchAllServers();
    }, [fetchAllServers]);

    const toggle = () => {
        setModal(!modal);
        resetModal(); // Reset modal data when closed
    };

    // Function to reset modal fields
    const resetModal = () => {
        setGroupName("");
        setCover(null);
        setVisibility("public");
        setType("group");
        setGroupDesc("");
        setSelectedContact([]);
        setIsEditMode(false);
        setSelectedGroupId(null);
    };

    const handleUpdateGroup = (group) => {
        // Populate modal with group data for updating
        setGroupName(group.name);
        setVisibility(group.visibility);
        setType(group.type);
        setGroupDesc(group.description || "");
        setSelectedContact(group.members.map(member => ({ id: member.id, name: member.name })));
        setSelectedGroupId(group._id);
        setIsEditMode(true); // Set to edit mode
        setModal(true); // Open modal
    };

    const createNewGroup = () => {
        // Check if there are at least 2 members selected
        if (selectedContact.length >= 2) {
            const groupData = {
                // id: selectedGroupId, // Use selected group ID if updating
                name: groupName,
                cover: cover ? URL.createObjectURL(cover) : null,
                admin: "admin-id-placeholder",
                members: selectedContact.map(contact => contact.id.toString()),
                visibility,
                type,
                // description: groupDesc
            };

            if (isEditMode) {
                // Dispatch the update action if in edit mode
                dispatch(updateGroupRequest(groupData));
            } else {
                // Dispatch the create action if in create mode
                dispatch(createGroupRequest(groupData));
            }
            toggle(); // Close the modal
        } else {
            setMessage("Minimum 2 members required!!!");
            setIsOpenAlert(true);
            setTimeout(() => {
                setIsOpenAlert(false);
            }, 3000);
        }
    };

    const handleCheck = (e, contactId) => {
        const { checked, value } = e.target;
        setSelectedContact(prevContacts => {
            if (checked) {
                return [...prevContacts, { id: contactId, name: value }];
            } else {
                return prevContacts.filter(contact => contact.id !== contactId);
            }
        });
    };

    useEffect(() => {}, [selectedContact]);

    const toggleCollapse = () => setIsOpenCollapse(!isOpenCollapse);

    const handleDeleteGroup = (groupId) => {
        dispatch(deleteGroupRequest(groupId));
    };

    const handleLeaveGroup = (groupId) => {};

    return (
        <React.Fragment>
            <div className="p-4">
                <div className="user-chat-nav float-end">
                    <Button onClick={() => { toggle(); setIsEditMode(false); }} type="button" color="link" className="text-decoration-none text-muted font-size-18 py-0" id="create-group">
                        <i className="ri-group-line me-1"></i>
                    </Button>
                    <UncontrolledTooltip target="create-group" placement="bottom">
                        {t('Create group')}
                    </UncontrolledTooltip>
                </div>
                <h4 className="mb-4">{t('Groups')}</h4>

                <Modal isOpen={modal} centered toggle={toggle}>
                    <ModalHeader tag="h5" className="modal-title font-size-14" toggle={toggle}>
                        {isEditMode ? t('Update Group') : t('Create New Group')}
                    </ModalHeader>
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
                        <Button type="button" color="primary" onClick={createNewGroup}>
                            {isEditMode ? t('Update Group') : t('Create Group')}
                        </Button>
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
                
                <SimpleBar style={{ maxHeight: "100%" }} className="p-4 chat-message-list chat-group-list">
                    <ul className="list-unstyled chat-list">
                        {Array.isArray(groups) && groups.map((group) => (
                            <li key={group._id}>
                                <Link to="#">
                                    <div className="d-flex align-items-center justify-content-between">
                                        <div className="chat-user-img me-3 ms-0">
                                            <div className="avatar-xs">
                                                <span className="avatar-title rounded-circle bg-soft-primary text-primary">
                                                    {group.name.charAt(0)}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex-grow-1">
                                            <h5 className="font-size-14 mb-0">{group.name}</h5>
                                        </div>
                                        <div className="dropdown">
                                            <Dropdown isOpen={activeGroupMenu === group._id} toggle={() => toggleGroupMenu(group._id)}>
                                                <DropdownToggle className="btn btn-link font-size-18 py-0" tag="i">
                                                    <i className="ri-more-fill"></i>
                                                </DropdownToggle>
                                                <DropdownMenu end>
                                                    <DropdownItem onClick={() => handleUpdateGroup(group)}>{t('Edit')}</DropdownItem>
                                                    <DropdownItem onClick={() => handleDeleteGroup(group._id)}>{t('Delete')}</DropdownItem>
                                                    <DropdownItem onClick={() => handleLeaveGroup(group._id)}>{t('Leave')}</DropdownItem>
                                                </DropdownMenu>
                                            </Dropdown>
                                        </div>
                                    </div>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </SimpleBar>
            </div>
        </React.Fragment>
    );
};

// Connect Redux
const mapStateToProps = (state) => {
    const { groups } = state.Chat;
    return { groups };
};

export default connect(mapStateToProps, { createGroupRequest, fetchAllServers, updateGroupRequest })(withTranslation()(Groups));
