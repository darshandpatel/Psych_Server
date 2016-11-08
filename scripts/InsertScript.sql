USE Psych;

insert into fieldlookup values (1, 'State', 'Alabama', 'Alabama');
insert into fieldlookup values (2, 'State', 'Alaska', 'Alaska');
insert into fieldlookup values (3, 'State', 'Arizona', 'Arizona');
insert into fieldlookup values (4, 'State', 'Arkansas', 'Arkansas');
insert into fieldlookup values (5, 'State', 'California', 'California');
insert into fieldlookup values (6, 'State', 'Colorado', 'Colorado');
insert into fieldlookup values (7, 'State', 'Connecticut', 'Connecticut');
insert into fieldlookup values (8, 'State', 'Delaware', 'Delaware');
insert into fieldlookup values (9, 'State', 'Florida', 'Florida');
insert into fieldlookup values (10, 'State', 'Georgia', 'Georgia');
insert into fieldlookup values (11, 'State', 'Hawaii', 'Hawaii');
insert into fieldlookup values (12, 'State', 'Idaho', 'Idaho');
insert into fieldlookup values (13, 'State', 'Illinois', 'Illinois');
insert into fieldlookup values (14, 'State', 'Indiana', 'Indiana');
insert into fieldlookup values (15, 'State', 'Iowa', 'Iowa');
insert into fieldlookup values (16, 'State', 'Kansas', 'Kansas');
insert into fieldlookup values (17, 'State', 'Kentucky', 'Kentucky');
insert into fieldlookup values (18, 'State', 'Louisiana', 'Louisiana');
insert into fieldlookup values (19, 'State', 'Maine', 'Maine');
insert into fieldlookup values (20, 'State', 'Maryland', 'Maryland');
insert into fieldlookup values (21, 'State', 'Massachusetts', 'Massachusetts');
insert into fieldlookup values (22, 'State', 'Michigan', 'Michigan');
insert into fieldlookup values (23, 'State', 'Minnesota', 'Minnesota');
insert into fieldlookup values (24, 'State', 'Mississippi', 'Mississippi');
insert into fieldlookup values (25, 'State', 'Missouri', 'Missouri');
insert into fieldlookup values (26, 'State', 'Montana', 'Montana');
insert into fieldlookup values (27, 'State', 'Nebraska', 'Nebraska');
insert into fieldlookup values (28, 'State', 'Nevada', 'Nevada');
insert into fieldlookup values (29, 'State', 'New Hampshire', 'New Hampshire');
insert into fieldlookup values (30, 'State', 'New Jersey', 'New Jersey');
insert into fieldlookup values (31, 'State', 'New Mexico', 'New Mexico');
insert into fieldlookup values (32, 'State', 'New York', 'New York');
insert into fieldlookup values (33, 'State', 'North Carolina', 'North Carolina');
insert into fieldlookup values (34, 'State', 'North Dakota', 'North Dakota');
insert into fieldlookup values (35, 'State', 'Ohio', 'Ohio');
insert into fieldlookup values (36, 'State', 'Oklahoma', 'Oklahoma');
insert into fieldlookup values (37, 'State', 'Oregon', 'Oregon');
insert into fieldlookup values (38, 'State', 'Pennsylvania', 'Pennsylvania');
insert into fieldlookup values (39, 'State', 'Rhode Island', 'Rhode Island');
insert into fieldlookup values (40, 'State', 'South Carolina', 'South Carolina');
insert into fieldlookup values (41, 'State', 'South Dakota', 'South Dakota');
insert into fieldlookup values (42, 'State', 'Tennessee', 'Tennessee');
insert into fieldlookup values (43, 'State', 'Texas', 'Texas');
insert into fieldlookup values (44, 'State', 'Utah', 'Utah');
insert into fieldlookup values (45, 'State', 'Vermont', 'Vermont');
insert into fieldlookup values (46, 'State', 'Virginia', 'Virginia');
insert into fieldlookup values (47, 'State', 'Washington', 'Washington');
insert into fieldlookup values (48, 'State', 'West Virginia', 'West Virginia');
insert into fieldlookup values (49, 'State', 'Wisconsin', 'Wisconsin');
insert into fieldlookup values (50, 'State', 'Wyoming', 'Wyoming');

insert into fieldLookup values (51, 'Role', 'GlobalAdministrator', 'Global Administrator Description');
insert into fieldLookup values (52, 'Role', 'LocalAdministrator', 'Local Administrator Description');

insert into location (location.id, location.locCode, location.locName, location.description, location.keywords, location.addressLine1, location.addressLine2,  location.city, location.state, location.zipcode, location.phoneNumber, location.faxNumber, location.email)  values (1, 'ABCD12', 'Northeastern University', 'Location Decription', 'Keywords1, Keywords2, Keyword3', '360 Huntington Ave', '', 'Boston', 21, 02120, 1234567891, 1234567891, 'northeastern@google.com');

insert into location (location.id, location.locCode, location.locName, location.description, location.keywords, location.addressLine1, location.addressLine2,  location.city, location.state, location.zipcode, location.phoneNumber, location.faxNumber, location.email)  values (2, 'CDEFGH', 'Mass General Hospital', 'Massachusetts General Hospital is the original and largest teaching hospital of Harvard Medical School and a biomedical research facility located in the West End neighborhood of Boston, Massachusetts.', 'Boston |%$| General', '55 Fruit St', '', 'Boston', 21, 02114,  6177262000, 6177262000, 'massgeneral@google.com');

insert into admin (admin.id, admin.firstName, admin.lastName, admin.email, admin.password, admin.locationId,
admin.privilegeToReleaseFeedback, admin.privilegeToCustomizeTraining, role) values 
(1, 'Darshan', 'Patel', 'patel.dars@husky.neu.edu', 'Abcde@12345', 5, true, true, 51);
