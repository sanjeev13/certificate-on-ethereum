pragma solidity ^0.4.25;

contract CertificateContract {

    address private owner;

    constructor() public{
        owner = msg.sender;
    }

    modifier onlyOwner(){
        require(msg.sender == owner);
        _;
    }

    event CertificateAdded(string id, string name, string  issueDate, string grade);

    struct Certificate {
       string name;
       string issueDate;
       string grade;
    }

    mapping(string => Certificate) certificates;

    function addCertificate(string memory id, string memory name, string memory issueDate, string memory grade) public onlyOwner{
        certificates[id] = Certificate(name,issueDate,grade);
        emit CertificateAdded(id,name,issueDate,grade);
    }

    function getCertificate(string memory id) public view returns(string memory name,string memory issueDate,string memory grade){
        Certificate memory certificate = certificates[id];
        return (certificate.name,certificate.issueDate,certificate.grade);
    }

}
