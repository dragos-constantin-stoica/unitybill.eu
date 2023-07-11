Vue.component("clients", {
    data() {
        return {
            loading: true,
            company:null,
            company_list: [
        		{ value: null, text: 'Please select an option' }
             ],           
            show: true
        }
    },
    created() {
      axios.get('/companies')
      .then(response => {
        console.log(response.data)
        if (response.data.status = 'ok') {
          this.company_list = response.data.dataset.map(item => {
            let tmp = {}
            tmp.value = item
            tmp.text = item.name
            return tmp
          })
          //we select by default the 1st company
          this.company = this.company_list[0].value
          this.loading = false
        }
      })
    },
    
    template: `
    <div class="d-flex justify-content-center mb-3" v-if="loading">
          <b-spinner type="grow" label="Loading..."></b-spinner>
    </div>
    
    <div v-else>
    <b-card title="Clients" sub-title="Add significant sections">
        <b-card-text>
        	<b-form-select v-model="company" :options="company_list"></b-form-select>
        	Select one of the companies from the list
        </b-card-text>

        <b-card-text>
           <b-form-input id="client_search" type="search"></b-form-input>
           <b-form-text id="client_search-help">Enter any information: company name, national registration number, VAT.</b-form-text>
        </b-card-text>
        
        <b-card-text>
        	We have a list of clients. Ideally they are registered as Companies in the database so that we can naturally invite them to join the platform.
        	For each Company there is a separate list of Clients.
        </b-card-text>


	<b-card-text>
        Mandatory data: full name, national registration number, vat code, address.
        Contact person email ;-) to send  marketing messages.
        Check if the company already exists in our database and use that data.
        </b-card-text>

        <b-card-text>
        Optional data: bank name, iban, swift, bic, currency (multiple accounts should be possible)
        </b-card-text>

    </b-card>
    </div>
	`
});
