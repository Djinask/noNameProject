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
exports.query_select_object="SELECT * FROM Object JOIN Autors ON autor = id_autor JOIN Exhibitions ON exhibition = id_exhibition JOIN Sections ON section = id_section WHERE object_id=?";

exports.query_insert_mail="INSERT INTO User(email,password) VALUES (?, ?)";
//QUERY LIMIT

exports.query_select_objects="SELECT * FROM Object LIMIT ?, 24";


//FILTER
exports.query_select_object_by_author="SELECT * FROM Object inner join Autors on Object.autor=Autors.id_autor WHERE id_autor=? LIMIT ?, 24";
exports.query_select_object_by_section="SELECT * FROM Object inner join Sections on Object.section=Sections.id_section WHERE id_section=? LIMIT ?, 24";
exports.query_select_object_by_exhibition="SELECT * FROM Object inner join Exhibitions on Object.exhibition=Exhibitions.id_exhibition WHERE id_exhibition=? LIMIT ?, 24";


exports.query_search = "SELECT DISTINCT object_id, name FROM Object INNER JOIN Autors ON Object.autor=Autors.id_autor INNER JOIN Sections ON Object.section=Sections.id_section inner join Exhibitions on Object.exhibition=Exhibitions.id_exhibition WHERE autor_name LIKE ? or section_name LIKE ? or exhibition_name LIKE ? or name LIKE ? LIMIT ?, 24";

//LOGIN

exports.query_login="SELECT * FROM User WHERE email = ? AND password = ? ";
exports.query_get_user_data="SELECT * FROM User WHERE user_id = ?";
exports.query_change_hash="UPDATE User SET hash = ? WHERE user_id = ?";
exports.query_get_user="SELECT * FROM User WHERE user_id = ?";

// UPDATE USER DATA
exports.query_change_password="UPDATE User SET password = ? WHERE user_id = ?";
exports.query_change_email="UDATE User SET email = ? WHERE user_id = ?";

//INSERIMENTO PHOTO PERSONALI

exports.query_insert_photo="INSERT INTO PersonalPhoto(user_id, comment, title) VALUES(?,?,?)";

//VISUALIZZAZIONE FOTO PERSONALI

exports.query_select_photos="SELECT * FROM PersonalPhoto WHERE user_id=?";
exports.query_get_bookmarks="SELECT * FROM UserBookmark NATURAL JOIN Object JOIN Exhibitions ON exhibition = id_exhibition JOIN Autors ON autor = id_autor WHERE user_id = ?";

//ADD PHOTOBOOK

exports.query_photobook_add="INSERT INTO UserBookmark(user_id, object_id) VALUES(?,?)";

//REMOVING
//remove bookmark
exports.query_del_bookmark="DELETE FROM UserBookmark WHERE user_id = ?  AND object_id=?";
//remove PersonalPhoto
exports.query_del_photo="DELETE FROM PersonalPhoto WHERE user_id = ? AND personal_photo_id=?";

// ++++++++++++++++ ADMIN QUERY-SET +++++++++++++++++++

// GET QUERY
exports.query_get_exhibitions="SELECT * FROM Exhibitions";
exports.query_get_exhibition_by_id="SELECT * FROM Exhibitions WHERE id_exhibition = ?";
exports.query_get_users="SELECT * FROM User";
exports.query_get_single_user="SELECT * FROM User WHERE user_id = ?";

// ADD QUERY
exports.query_add_opera="INSERT INTO Object(name,autor) VALUES (?,?)";
exports.query_add_desc_to_opera="INSERT INTO Object(description) VALUES (?)";
exports.query_add_exhibition_to_opera="INSERT INTO Object(exhibition) VALUES (?)";
exports.query_add_section_to_opera="INSERT INTO Object(section) VALUES (?)";

// CHANGES QUERY
	// Exhibition
exports.query_reset_exhibition_name="UDATE Exhibitions SET exhibition_name = ? WHERE id_exhibition = ?";
exports.query_reset_exhibition_beginning="UDATE Exhibitions SET beginning_date = ? WHERE id_exhibition = ?";
exports.query_reset_exhibition_end="UDATE Exhibitions SET end_date = ? WHERE id_exhibition = ?";
exports.query_reset_exhibition_description="UDATE Exhibitions SET description = ? WHERE id_exhibition = ?";
	// Opera
exports.query_reset_opera_name="UPDATE Object SET name = ? WHERE object_id = ?";
exports.query_reset_opera_author="UPDATE Object SET autor = ? WHERE object_id = ?";
exports.query_reset_opera_exhibition="UPDATE Object SET exhibition = ? WHERE object_id = ?";
exports.query_reset_opera_section="UPDATE Object SET section = ? WHERE object_id = ?";
exports.query_reset_opera_description="UPDATE Object SET description = ? WHERE object_id = ?";
	// Sections
exports.query_reset_section_name="UPDATE Sections SET section_name = ? WHERE id_section = ?";