import { Injectable } from '@angular/core';
import { Customer, CustomerContact } from '../customer.model';
import { UtilService } from '../../core/util.service';
import { HttpClient } from '@angular/common/http';
import { CustomerService } from '../customer.service';

@Injectable()
export class CustomerEditService {
  constructor(
    private util: UtilService,
    private http: HttpClient,
    private customerService: CustomerService,
  ) {

  }

  /**
   * Save changes on server
   * 
   * @param customerToSave Data for the customer to be updated
   */
  saveCustomer(customerToSave) {

    // Set up post request
    const req = this.http.post<Customer>(
      '/customers' + (customerToSave.id ? '/' + customerToSave.id : ''),
      customerToSave
    )

    return new Promise<Customer>((resolve, reject) => {
      // Execute post request and subscribe to response
      req.subscribe(
        data => {
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

  prepareEditCustomer(id: number) {
    return new Promise<Customer>((resolve, reject) => {
      if (id && id > 0) {
        // Reload customer before editing
        this.customerService.getCustomerById(id)
          .then((customer) => {
            resolve(customer)
          })
          .catch((error) => {
            reject(error)
          })
      } else {
        resolve(new Customer())
      }
    })
  }

  // --------- CustomerContact -------------

  prepareEditCustomerContact(customerId: number, contactId: number) {
    return new Promise<CustomerContact>((resolve, reject) => {
      if (!(customerId > 0)) {
        reject(new Error('Fehler: Es wurde keine Kundenid übergeben - bitte Info an Thomas!'));
        return
      }

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
        resolve(new CustomerContact())
      }
    })
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
          resolve(data)
        },
        error => {
          reject(error)
        });
    })
  }



  /**
   * Save changes on server
   * 
   * @param customerContactToSave Data for the customerContact to be updated
   */
  saveCustomerContact(customerId, customerContactToSave) {
    // Set up post request
    const req = this.http.post<CustomerContact>(
      '/customers/' + customerId + '/contacts' + (customerContactToSave.id ? '/' + customerContactToSave.id : ''),
      customerContactToSave
    )

    // Execute post request and subscribe to response
    return new Promise<CustomerContact>((resolve, reject) => {
      req.subscribe(
        data => {
          resolve(data)
        },
        error => {
          reject(new Error("Fehler beim Speichern:" + error.message))
        });
    })
  }

  deleteCustomerContact(customerId, customerContactToDelete) {
    return new Promise((resolve, reject) => {

      if (!customerContactToDelete || !customerContactToDelete.id) {
        reject(new Error('Kontakt oder Kontakt Id fehlt!'))
        return
      }

      // Set up post request
      const req = this.http.delete<any>(
        '/customers/' + customerId + '/contacts/' + customerContactToDelete.id
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