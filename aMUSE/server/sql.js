/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 *
 *
 * QUERIES**
 *
 *
 */

exports.query_data="SELECT * FROM aMuseObject NATURAL JOIN aMuseAuthor NATURAL JOIN aMuseSection NATURAL JOIN aMuseExhibition WHERE exhibition_begin <= CURRENT_DATE AND exhibition_end >= CURRENT_DATE";
exports.query_select_sections="SELECT * FROM aMuseSection ORDER BY section_name";
exports.query_select_exhibitions="SELECT * FROM aMuseExhibition WHERE exhibition_begin <= CURRENT_DATE AND exhibition_end >= CURRENT_DATE ORDER BY exhibition_name";
exports.query_select_authors="SELECT * FROM aMuseAuthor ORDER BY author_name";
exports.query_select_object="SELECT * FROM aMuseObject NATURAL JOIN aMuseAuthor NATURAL JOIN aMuseExhibition NATURAL JOIN aMuseSection WHERE object_id = ?";

exports.query_insert_user="INSERT INTO aMuseUser(user_email, user_password, user_url) VALUES (?, ?, ?)";
//QUERY LIMIT

exports.query_select_objects="SELECT * FROM aMuseObject NATURAL JOIN aMuseAuthor NATURAL JOIN aMuseSection NATURAL JOIN aMuseExhibition WHERE exhibition_begin <= CURRENT_DATE AND exhibition_end >= CURRENT_DATE LIMIT ?, 384";


//FILTER

exports.query_select_object_by_author="SELECT * FROM aMuseObject NATURAL JOIN aMuseAuthor NATURAL JOIN aMuseSection NATURAL JOIN aMuseExhibition WHERE author_id = ? AND exhibition_begin <= CURRENT_DATE AND exhibition_end >= CURRENT_DATE LIMIT ?, 384";
exports.query_select_object_by_section="SELECT * FROM aMuseObject NATURAL JOIN aMuseSection NATURAL JOIN aMuseExhibition NATURAL JOIN aMuseAuthor WHERE section_id = ? AND exhibition_begin <= CURRENT_DATE AND exhibition_end >= CURRENT_DATE LIMIT ?, 384";
exports.query_select_object_by_exhibition="SELECT * FROM aMuseObject NATURAL JOIN aMuseExhibition NATURAL JOIN aMuseSection NATURAL JOIN aMuseAuthor WHERE exhibition_id = ? AND exhibition_begin <= CURRENT_DATE AND exhibition_end >= CURRENT_DATE LIMIT ?, 384";


//exports.query_search = "SELECT DISTINCT * FROM aMuseObject WHERE MATCH(object_name, object_description) AGAINST(?) AND exhibition_begin <= CURRENT_DATE AND exhibition_end >= CURRENT_DATE LIMIT ?, 384";

exports.query_search = "SELECT * FROM (SELECT DISTINCT * FROM aMuseObject WHERE MATCH(object_name, object_description) AGAINST(?)) AS t1 NATURAL JOIN aMuseExhibition WHERE exhibition_begin <= CURRENT_DATE AND exhibition_end >= CURRENT_DATE LIMIT ?, 384";

//LOGIN

exports.query_login="SELECT * FROM aMuseUser WHERE user_email = ? AND user_password = ?";
exports.query_get_user_data="SELECT * FROM aMuseUser WHERE user_id = ?";
exports.query_change_hash="UPDATE aMuseUser SET user_hash = ? WHERE user_id = ?";
exports.query_get_user="SELECT * FROM aMuseUser WHERE user_id = ?";
exports.query_get_user_by_url = "SELECT * FROM aMuseUser WHERE user_url = ?";

// UPDATE USER DATA

exports.query_change_user_password="UPDATE aMuseUser SET user_password = ? WHERE user_id = ? AND user_password = ?";
exports.query_change_user_email="UPDATE aMuseUser SET user_email = ? WHERE user_id = ? AND user_password = ?";

//INSERIMENTO PHOTO PERSONALI

exports.query_insert_photo="INSERT INTO aMusePersonalPhoto(user_id, personalphoto_comment, personalphoto_name, object_id) VALUES(?,?,?,?)";
exports.query_is_photo_owner = "SELECT * FROM aMusePersonalPhoto WHERE user_id = ? AND personalphoto_id = ?";
//VISUALIZZAZIONE FOTO PERSONALI

exports.query_check_if_bookmarked ="SELECT * FROM aMuseUserBookmark WHERE object_id = ?";
exports.query_select_photos="SELECT * FROM aMusePersonalPhoto WHERE user_id = ?";
exports.query_get_bookmarks="SELECT * FROM aMuseUserBookmark NATURAL JOIN aMuseObject NATURAL JOIN aMuseExhibition NATURAL JOIN aMuseAuthor NATURAL JOIN aMuseVisit WHERE user_id = ? ORDER BY visit_id ASC";
exports.query_get_photo = "SELECT * FROM aMusePersonalPhoto NATURAL LEFT OUTER JOIN aMuseObject WHERE personalphoto_id = ?";

//ADD PHOTOBOOK

exports.query_insert_bookmark="INSERT INTO aMuseUserBookmark(user_id, object_id, visit_id) VALUES(?,?,?)";
exports.query_get_last_visit = "SELECT * FROM aMuseVisit NATURAL RIGHT OUTER JOIN aMuseUser WHERE user_id = ? ORDER BY visit_id DESC LIMIT 0, 1";
exports.query_insert_visit = "INSERT INTO aMuseVisit(user_id) VALUES(?)";

//REMOVING
	//remove bookmark
exports.query_del_bookmark="DELETE FROM aMuseUserBookmark WHERE user_id = ?  AND object_id = ?";
	//remove aMusePersonalPhoto
exports.query_del_photo="DELETE FROM aMusePersonalPhoto WHERE user_id = ? AND personalphoto_id = ?";

// ++++++++++++++++ ADMIN QUERY-SET +++++++++++++++++++
exports.query_data_all="SELECT * FROM aMuseObject NATURAL JOIN aMuseAuthor NATURAL JOIN aMuseSection NATURAL JOIN aMuseExhibition";
exports.query_check_if_admin = "SELECT * FROM aMuseAdmin WHERE admin_name = ? AND admin_hash = ?";
exports.query_admin_login = "UPDATE aMuseAdmin SET admin_hash = ? WHERE admin_name = ? AND admin_password = ?";

// GET QUERY
exports.query_get_exhibitions="SELECT * FROM aMuseExhibition";
exports.query_get_exhibition_by_id="SELECT * FROM aMuseExhibition WHERE exhibition_id = ?";
exports.query_get_users="SELECT * FROM aMuseUser";
exports.query_get_user_by_id="SELECT * FROM aMuseUser WHERE user_id = ?";
exports.query_get_user_by_email="SELECT * FROM aMuseUser WHERE user_email = ?";
exports.query_get_sections="SELECT * FROM aMuseSection";
exports.query_get_section_by_id="SELECT * FROM aMuseSection WHERE section_id = ?";
exports.query_get_admin_users = "SELECT * FROM aMuseAdmin";
exports.query_get_all_admin_users = "SELECT * FROM aMuseAdmin LIMIT 0,2";
exports.query_select_object_by_author_all="SELECT * FROM aMuseObject NATURAL JOIN aMuseAuthor NATURAL JOIN aMuseSection NATURAL JOIN aMuseExhibition WHERE author_id = ? LIMIT ?, 384";
exports.query_select_object_by_section_all="SELECT * FROM aMuseObject NATURAL JOIN aMuseSection NATURAL JOIN aMuseExhibition NATURAL JOIN aMuseAuthor WHERE section_id = ? LIMIT ?, 384";
exports.query_select_object_by_exhibition_all="SELECT * FROM aMuseObject NATURAL JOIN aMuseExhibition NATURAL JOIN aMuseSection NATURAL JOIN aMuseAuthor WHERE exhibition_id = ? LIMIT ?, 384";


/* USE QUERY GET DATA FOR GETTING OPERAS INFO */
exports.query_get_opera_by_id="SELECT * FROM aMuseObject NATURAL JOIN aMuseAuthor NATURAL JOIN aMuseSection NATURAL JOIN aMuseExhibition WHERE object_id = ?";
exports.query_get_personal_photos_by_user_id="SELECT * FROM aMusePersonalPhoto WHERE user_id = ?";
exports.query_get_personal_photos_by_id="SELECT * FROM aMusePersonalPhoto WHERE personalphoto_id = ?";
exports.query_get_authors="SELECT * FROM aMuseAuthor";
exports.query_get_authors_by_id="SELECT * FROM aMuseAuthor WHERE author_id = ?";
exports.query_get_authors_in_alpha_order="SELECT * FROM aMuseAuthor ORDER BY author_name";
exports.query_get_last_opera_id="SELECT MAX(object_id) FROM aMuseObject"

// ADD QUERY
exports.query_add_opera="INSERT INTO aMuseObject(object_name,exhibition_id,section_id,author_id,object_description) VALUES (?,?,?,?,?)";
exports.query_add_author="INSERT INTO aMuseAuthor(author_name) VALUES (?)";
exports.query_add_exhibition="INSERT INTO aMuseExhibition(exhibition_name,exhibition_begin,exhibition_end,exhibition_description) VALUES (?,?,?,?)";
exports.query_add_section="INSERT INTO aMuseSection(section_name) VALUES (?)";
exports.query_add_visit="INSERT INTO aMuseVisit(user_id) VALUES (?)";
exports.query_add_admin_user= "INSERT INTO aMuseAdmin (admin_password, admin_name) VALUES (?,?)";

// REMOVE QUERY
	// Ban aMuseUser
exports.query_remove_user="DELETE  FROM aMuseUser WHERE user_id = ?";
exports.query_remove_bookmarked="DELETE  FROM aMuseUserBookmark WHERE user_id = ?";
exports.query_remove_personal_photos="DELETE  FROM aMusePersonalPhoto WHERE user_id = ?";
exports.query_remove_personal_photo="DELETE  FROM aMusePersonalPhoto WHERE personalphoto_id = ?";
	// Various removal
exports.query_remove_opera_by_id="DELETE FROM aMuseObject WHERE object_id = ?";
exports.query_remove_author_by_id="DELETE FROM aMuseAuthor WHERE author_id = ?";
exports.query_remove_section_by_id="DELETE FROM aMuseSection WHERE section_id = ?";
exports.query_remove_visit_by_id="DELETE FROM aMuseVisit WHERE visit_id = ?";
exports.query_remove_exhibition_by_id="DELETE FROM aMuseExhibition WHERE exhibition_id = ?";
exports.query_remove_admin_user_by_name = "DELETE FROM aMuseAdmin WHERE admin_name = ?";

// CHANGES QUERY
	// Exhibition
exports.query_reset_exhibition_by_id="UPDATE aMuseExhibition SET exhibition_name = ?, exhibition_begin = ?, exhibition_end = ?, exhibition_description = ? WHERE exhibition_id = ?";

	// Opera
exports.query_reset_opera_name="UPDATE aMuseObject SET object_name = ?, object_description = ?, author_id = ?, exhibition_id = ?, section_id = ? WHERE object_id = ?";
exports.query_reset_author_name="UPDATE aMuseAuthor SET author_name = ? WHERE author_id = ?";
	// Section
exports.query_reset_section_name="UPDATE aMuseSection SET section_name = ? WHERE section_id = ?";
	// visit
exports.query_reset_visit_user="UPDATE aMuseVisit SET user_id = ? WHERE visit_id = ?";

//BOOKLET
exports.query_get_bookmarks_by_url = "SELECT * FROM aMuseUserBookmark NATURAL JOIN aMuseUser NATURAL JOIN aMuseObject NATURAL JOIN aMuseSection NATURAL JOIN aMuseAuthor NATURAL JOIN aMuseExhibition WHERE user_url = ? LIMIT ?, 2";
exports.query_get_photos_by_url = "SELECT * FROM aMusePersonalPhoto NATURAL JOIN aMuseUser WHERE user_url = ? LIMIT ?, 2";
exports.query_check_if_photo_in_url = "SELECT * FROM aMusePersonalPhoto NATURAL JOIN aMuseUser WHERE user_url = ? AND personalphoto_id = ?";