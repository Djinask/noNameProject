/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 *
 *
 * QUERIES**
 *
 *
 */

exports.query_data="SELECT * FROM Object";
exports.query_select_sections="SELECT * FROM Sections ORDER BY section_name";
exports.query_select_exhibitions="SELECT * FROM Exhibitions ORDER BY exhibition_name";
exports.query_select_authors="SELECT * FROM Autors ORDER BY autor_name";
exports.query_select_object="SELECT * FROM Object WHERE object_id=?";


exports.query_insert_mail="INSERT INTO User(email,password) VALUES (?, ?)";
//QUERY LIMIT

exports.query_select_objects_limit="SELECT * FROM Object LIMIT ?, 24";


//FILTER
exports.query_select_object_by_author="SELECT * FROM Object inner join Autors on Object.autor=Autors.id_autor WHERE id_autor=?";
exports.query_select_object_by_section="SELECT * FROM Object inner join Sections on Object.section=Sections.id_section WHERE id_section=?";
exports.query_select_object_by_exhibition="SELECT * FROM Object inner join Exhibitions on Object.exhibition=Exhibitions.id_exhibition WHERE id_exhibition=?";


exports.query_search = "SELECT DISTINCT object_id, name FROM Object inner join Autors on Object.autor=Autors.id_autor inner join Sections on Object.section=Sections.id_section inner join Exhibitions on Object.exhibition=Exhibitions.id_exhibition WHERE autor_name LIKE ? or section_name like ? or exhibition_name like ? or name = ? or description = ?";

//LOGIN

exports.query_login="SELECT * FROM User WHERE email = ? AND password = ? ";

//INSERIMENTO PHOTO PERSONALI

exports.query_photo_insert="INSERT INTO PersonalPhoto(user_id, comment) VALUES(?,?)";

//VISUALIZZAZIONE FOTO PERSONALI

exports.query_photo_view="SELECT * FROM PersonalPhoto WHERE user_id=?";

//ADD PHOTOBOOK

exports.query_photobook_add="INSERT INTO UserBookmark(user_id, object_id) VALUES(?,?)";

//REMOVING
//remove bookmark
exports.query_del_bookmark="DELETE FROM UserBookmark WHERE user_id = ?  AND object_id=?";
//remove PersonalPhoto
exports.query_del_photo="DELETE FROM PersonalPhoto WHERE user_id = ? AND personal_photo_id=?";
