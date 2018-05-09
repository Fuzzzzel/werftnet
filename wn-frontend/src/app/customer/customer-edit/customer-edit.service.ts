import { Injectable } from '@angular/core';
import { Customer, CustomerContact } from '../customer.model';
import { UtilService } from '../../core/util.service';
import { HttpClient } from '@angular/common/http';
import { CustomerSearchService } from '../customer-search/customer-search.service';

@Injectable()
export class CustomerEditService {

  private customerToEdit: Customer = new Customer();
  private customerContactToEdit: CustomerContact = new CustomerContact();
  private customerContactToEdit_CustomerId: number = null;

  constructor(
    private util: UtilService,
    private http: HttpClient,
    private customerSearchService: CustomerSearchService
  ) {

  }

  getCustomerToEdit() {
    return this.customerToEdit;
  }


  /**
   * Save changes on server
   * 
   * @param customerToSave Data for the customer to be updated
   */
  saveCustomer(customerToSave) {
    this.customerToEdit = customerToSave;

    // Kopie des Customers erstellen, um Datum in yyyy-mm-dd String zu wandeln, falls vorhanden
    let fl_save = this.util.cloneDeep(this.customerToEdit);

    // Set up post request
    const req = this.http.post<Customer>(
      '/customer/editCustomer',
      fl_save
    )

    // Execute post request and subscribe to response
    req.subscribe(
      data => {
        this.customerToEdit = data;
        this.customerSearchService.searchCustomers(null);
        this.util.historyBack();
      },
      error => {
        alert("Fehler beim Speichern:" + error.message);
      });

    return
  }

  deleteCustomer(customerToDelete) {
    if (!confirm('Customer ' + customerToDelete.name2 + ', ' + customerToDelete.name1 + ' wirklich löschen?!')) {
      return;
    }

    // Set up post request
    const req = this.http.post<Customer>(
      '/customer/deleteCustomer',
      customerToDelete.id
    )

    // Execute post request and subscribe to response
    req.subscribe(
      data => {
        this.customerSearchService.searchCustomers(null);
        this.util.historyBack();
      },
      error => {
        alert("Fehler beim Löschen:" + error.message);
      });

    return
  }

  /**
   * Loads customer by id and switches to edit view if found
   * 
   * @param id Id of the customer to be edited
   */
  getCustomerByIdAndEdit(id: number) {
    // Set up post request
    const req = this.http.get<Customer>(
      '/customer/' + id
    )

    // Execute post request and subscribe to response
    req.subscribe(
      data => {
        this.customerToEdit = data;
        console.log(data);
        this.util.goTo('/customer/edit');
      },
      error => {
        alert(error.message);
      });

    return
  }

  editCustomer(id: number) {
    this.customerToEdit = new Customer();
    if (id && id > 0) {
      // Reload customer before editing
      this.getCustomerByIdAndEdit(id);
    } else {
      this.util.goTo('/customer/edit');
    }
  }

  // --------- CustomerContact -------------

  getCustomerContactToEdit() {
    return this.customerContactToEdit;
  }

  getCustomerContactByIdAndEdit(id: number) {
    // Set up post request
    const req = this.http.get<CustomerContact>(
      '/customer_contact/' + id
    )

    // Execute post request and subscribe to response
    req.subscribe(
      data => {
        this.customerContactToEdit = data;
        console.log(data);
        this.util.goTo('/customer/edit_contact');
      },
      error => {
        alert(error.message);
      });

    return
  }

  editCustomerContact(customerId: number, contactId: number) {
    if (!(customerId > 0)) {
      alert('Fehler: Es wurde keine Kundenid übergeben - bitte Info an Thomas!');
      return
    }
    this.customerContactToEdit = new CustomerContact();
    this.customerContactToEdit_CustomerId = customerId;
    if (contactId && contactId > 0) {
      // Reload customer before editing
      this.getCustomerContactByIdAndEdit(contactId);
    } else {
      this.util.goTo('/customer/edit');
    }
  }


  /**
   * Save changes on server
   * 
   * @param customerContactToSave Data for the customerContact to be updated
   */
  saveCustomerContact(customerContactToSave) {
    this.customerContactToEdit = customerContactToSave;

    // Kopie des CustomerContacts erstellen, um Datum in yyyy-mm-dd String zu wandeln, falls vorhanden
    let cust_save = this.util.cloneDeep(this.customerContactToEdit);
    cust_save.customer_id = this.customerContactToEdit_CustomerId;

    // Set up post request
    const req = this.http.post<CustomerContact>(
      '/customer/editCustomerContact',
      cust_save
    )

    // Execute post request and subscribe to response
    req.subscribe(
      data => {
        this.customerContactToEdit = data;
        this.customerSearchService.searchCustomers(null);
        this.util.historyBack();
      },
      error => {
        alert("Fehler beim Speichern:" + error.message);
      });

    return
  }

  deleteCustomerContact(customerContactToDelete) {
    if (!confirm('Kundenkontakt ' + customerContactToDelete.name2 + ', ' + customerContactToDelete.name1 + ' wirklich löschen?!')) {
      return;
    }

    // Set up post request
    const req = this.http.post<CustomerContact>(
      '/customer/deleteContact',
      customerContactToDelete.id
    )

    // Execute post request and subscribe to response
    req.subscribe(
      data => {
        this.customerSearchService.searchCustomers(null);
        this.util.historyBack();
      },
      error => {
        alert("Fehler beim Löschen:" + error.message);
      });

    return
  }

}
