import { Injectable } from '@angular/core';
import { Customer, CustomerContact } from '../customer.model';
import { UtilService } from '../../core/util.service';
import { HttpClient } from '@angular/common/http';
import { CustomerSearchService } from '../customer-search/customer-search.service';
import { User } from '../../user/user.model';

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
    let customer_save = this.util.cloneDeep(this.customerToEdit);

    // Set up post request
    const req = this.http.post<Customer>(
      '/customers' + (customer_save.id ? '/' + customer_save.id : ''),
      customer_save
    )

    return new Promise<Customer>((resolve, reject) => {
      // Execute post request and subscribe to response
      req.subscribe(
        data => {
          this.customerToEdit = data;
          resolve(data)
        },
        error => {
          reject(new Error("Fehler beim Speichern:" + error.message))
        });
    })
  }

  deleteCustomer(customerToDelete) {
    return new Promise<any>((resolve, reject) => {
      if (!customerToDelete || !customerToDelete.id) {
        reject(new Error('Kunde oder Kunden Id fehlt!'))
        return
      }

      if (!confirm('Customer ' + customerToDelete.name2 + ', ' + customerToDelete.name1 + ' wirklich löschen?!')) {
        reject()
        return
      }

      // Set up post request
      const req = this.http.delete<Customer>(
        '/customers/' + customerToDelete.id
      )

      // Execute post request and subscribe to response
      req.subscribe(
        data => {
          resolve()
        },
        error => {
          reject(new Error('Fehler beim Löschen:' + error.message));
        });
    })
  }

  /**
   * Loads customer by id and switches to edit view if found
   * 
   * @param id Id of the customer to be edited
   */
  getCustomerById(id: number) {
    // Set up post request
    const req = this.http.get<Customer>(
      '/customers/' + id
    )

    return new Promise<Customer>((resolve, reject) => {
      // Execute post request and subscribe to response
      req.subscribe(
        data => {
          resolve(data)
        },
        error => {
          reject(error)
        });
    })
  }

  prepareEditCustomer(id: number) {
    return new Promise<Customer>((resolve, reject) => {
      this.customerToEdit = new Customer();
      if (id && id > 0) {
        // Reload customer before editing
        this.getCustomerById(id)
          .then((customer) => {
            this.customerToEdit = customer
            resolve(this.customerToEdit)
          })
          .catch((error) => {
            reject(error)
          })
      } else {
        resolve(this.customerToEdit)
      }
    })
  }

  // --------- CustomerContact -------------

  getCustomerContactToEdit() {
    return this.customerContactToEdit;
  }

  getCustomerContactById(customerId: number, contactId: number) {
    return new Promise<CustomerContact>((resolve, reject) => {
      if (!customerId || !contactId) {
        reject(new Error('Id des Kunden oder des Kontakts fehlt!'))
        return
      }

      // Set up post request
      const req = this.http.get<CustomerContact>(
        '/customers/' + customerId + '/contacts/' + contactId
      )

      // Execute post request and subscribe to response
      req.subscribe(
        data => {
          this.customerContactToEdit = data;
          resolve(data)
        },
        error => {
          reject(error)
        });
    })
  }

  prepareEditCustomerContact(customerId: number, contactId: number) {
    return new Promise<CustomerContact>((resolve, reject) => {
      if (!(customerId > 0)) {
        reject(new Error('Fehler: Es wurde keine Kundenid übergeben - bitte Info an Thomas!'));
        return
      }

      this.customerContactToEdit = new CustomerContact();
      this.customerContactToEdit_CustomerId = customerId;

      if (contactId && contactId > 0) {
        // Reload customer before editing
        this.getCustomerContactById(customerId, contactId)
          .then((customerContact) => {
            resolve(customerContact)
          })
          .catch((error) => {
            reject(error)
          })
      } else {
        resolve()
      }
    })
  }


  /**
   * Save changes on server
   * 
   * @param customerContactToSave Data for the customerContact to be updated
   */
  saveCustomerContact(customerContactToSave) {
    this.customerContactToEdit = customerContactToSave;

    // Kopie des CustomerContacts erstellen, um Datum in yyyy-mm-dd String zu wandeln, falls vorhanden
    let cust_save = this.util.cloneDeep(this.customerContactToEdit)

    // Set up post request
    const req = this.http.post<CustomerContact>(
      '/customers/' + this.customerContactToEdit_CustomerId + '/contacts' + (cust_save.id ? '/' + cust_save.id : ''),
      cust_save
    )

    // Execute post request and subscribe to response
    return new Promise<CustomerContact>((resolve, reject) => {
      req.subscribe(
        data => {
          this.customerContactToEdit = data;
          resolve(data)
        },
        error => {
          reject(new Error("Fehler beim Speichern:" + error.message))
        });
    })
  }

  deleteCustomerContact(customerContactToDelete) {
    return new Promise((resolve, reject) => {

      if (!customerContactToDelete || !customerContactToDelete.id) {
        reject(new Error('Kontakt oder Kontakt Id fehlt!'))
        return
      }

      // Set up post request
      const req = this.http.delete<any>(
        '/customers/' + this.customerContactToEdit_CustomerId + '/contacts/' + customerContactToDelete.id
      )

      // Execute post request and subscribe to response
      req.subscribe(
        data => {
          resolve(data)
        },
        error => {
          reject(error)
        });
    })
  }
}