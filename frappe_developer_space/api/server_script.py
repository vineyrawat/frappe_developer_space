import frappe
import json


@frappe.whitelist()
def execute_script(**data):
    script_doc_name = data.get("script_doc_name")
    selected_resource = data.get("selected_resource")
    script_doc = frappe.get_doc("Server Script", script_doc_name)
    if script_doc.script_type == "DocType Event":
        response = script_doc.execute_doc(frappe.get_doc(script_doc.reference_doctype, selected_resource))
        return response