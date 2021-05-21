<template>
  <q-page>
    <div class="row q-col-gutter-sm q-ma-xs q-mr-sm">
      <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
        <q-card flat bordered class>
          <q-card-section>
            <div class="text-h6">Add Deposit</div>
          </q-card-section>

          <q-separator inset></q-separator>

          <q-card-section>
            <q-form>
              <q-list>
                <q-item>
                  <q-item-section>
                    <q-item-label class="q-pb-xs">Account</q-item-label>
                    <q-select
                      dense
                      label="Account"
                      outlined
                      v-model="deposit.account"
                      :options="options"
                      stack-label
                      options-dense
                    ></q-select>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    <q-item-label class="q-pb-xs">Deposit Date</q-item-label>
                    <q-input
                      dense
                      outlined
                      v-model="deposit.date"
                      mask="date"
                      label="Deposit Date"
                    >
                      <template v-slot:append>
                        <q-icon name="event" class="cursor-pointer">
                          <q-popup-proxy
                            ref="depositDateProxy"
                            transition-show="scale"
                            transition-hide="scale"
                          >
                            <q-date
                              v-model="deposit.date"
                              
                            />
                          </q-popup-proxy>
                        </q-icon>
                      </template>
                    </q-input>
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    <q-item-label class="q-pb-xs">Description</q-item-label>
                    <q-input
                      dense
                      outlined
                      v-model="deposit.description"
                      label="Description"
                    />
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    <q-item-label class="q-pb-xs">Amount</q-item-label>
                    <q-input
                      dense
                      type="number"
                      outlined
                      v-model="deposit.amount"
                      label="Amount"
                    />
                  </q-item-section>
                </q-item>
                <q-item>
                  <q-item-section>
                    <q-item-label class="q-pb-xs">Phone</q-item-label>
                    <q-input
                      dense
                      type="number"
                      outlined
                      v-model="deposit.phone"
                      label="Phone"
                    />
                  </q-item-section>
                </q-item>
              </q-list>
              <q-card-actions align="right" class="text-teal">
                <q-btn
                  label="Save"
                  type="submit"
                  color="primary"
                  v-close-popup
                />
              </q-card-actions>
            </q-form>
          </q-card-section>
        </q-card>
      </div>
      
    </div>
  </q-page>
</template>

<script>

export default {
  data() {
    return {
      filter: "",
      mode: "list",
      deposit: {},
      pagination: {
        rowsPerPage: 10
      },
      options: [
        "National Bank",
        "Bank of Asia",
        "Corporate Bank",
        "Public Bank"
      ],
      columns: [
        {
          name: "description",
          align: "left",
          label: "Description",
          field: "description",
          sortable: true
        },
        {
          name: "amount",
          label: "Amount",
          align: "left",
          field: "amount",
          sortable: true
        }
      ],
      data: [
        {
          description: "Invoice 10 Payment",
          amount: "$ 200"
        },
        {
          description: "Pvt Ltd Invoice",
          amount: "$ 300"
        },
        {
          description: "Invoice 6 Payment",
          amount: "$ 250"
        },
        {
          description: "Invoice 18 Payment",
          amount: "$ 400"
        },
        {
          description: "John and company Payment",
          amount: "$ 500"
        }
      ]
    };
  },
  methods: {
    exportDepositsTable() {
      // naive encoding to csv format
      const content = [this.columns.map(col => wrapCsvValue(col.label))]
        .concat(
          this.data.map(row =>
            this.columns
              .map(col =>
                wrapCsvValue(
                  typeof col.field === "function"
                    ? col.field(row)
                    : row[col.field === void 0 ? col.name : col.field],
                  col.format
                )
              )
              .join(",")
          )
        )
        .join("\r\n");

      const status = exportFile("deposits.csv", content, "text/csv");

      if (status !== true) {
        this.$q.notify({
          message: "Browser denied file download...",
          color: "negative",
          icon: "warning"
        });
      }
    },
    showLoading() {
      this.$q.loading.show({
        message: '<b>Demo loading screen, replace your message here<b>'
      })

      // hiding in 2s
      this.timer = setTimeout(() => {
        this.$q.loading.hide();
        this.timer = void 0;
      }, 3000);
    },

    beforeDestroy() {
      if (this.timer !== void 0) {
        clearTimeout(this.timer);
        this.$q.loading.hide();
      }
    }
  },
    beforeMount() {
    this.showLoading();
  },
};
</script>

<style scoped></style>