<template>
  <div class="ct-grid-wrapper" v-bind:class="customCss.wrapperCss">
      <table v-bind:class="customCss.tableCss" class="table table-striped">
        <thead>
            <tr>
                <th
                  class="grid-header"
                  v-for="prop in gridData.props" v-bind:key="prop.id">
                    {{prop}}
                </th>
                <th v-if="gridData.actions">Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="row in gridData.rows" v-bind:key="row.id">
                <td v-for="prop in gridData.props" v-bind:key="prop">
                    {{getRowData(row, prop)}}
                </td>
                <td v-if="gridData.actions">
                  <div class="grid-actions float-right">
                    <button type="button" class="btn btn-outline-primary"
                          v-if="gridData.actions.viewItem"
                          @click="gridData.actions.viewItem(row)">
                          View
                      </button>
                      <button type="button" class="btn btn-outline-danger"
                          v-if="gridData.actions.deleteItem"
                          @click="gridData.actions.deleteItem(row)">
                          Delete
                      </button>
                      <button
                        class="btn btn-outline-primary"
                        v-for="(val, key) in gridData.actions"
                        v-bind:key="key"
                        v-if="key != 'deleteItem' && key != 'viewItem'"
                        @click="val.func(row)">
                          {{val.title}}
                      </button>
                    </div>
                </td>
            </tr>
        </tbody>
      </table>
  </div>
</template>

<script>
export default {
  name: 'CtGrid',
  props: {
    data: [Array, Object],
  },
  computed: {
    gridData: function gridDataFunc() {
      if (this.data != null) {
        return this.initialize(this.data);
      }

      return null;
    },
    customCss: function customCss() {
      const css = {
        wrapperCss: '',
        tableCss: '',
      };

      if (this.data == null) {
        return css;
      }

      css.wrapperCss = (this.gridData && this.gridData.css && this.gridData.css.wrapper) || '';
      css.tableCss = (this.gridData && this.gridData.skipBootstrap) ? '' : 'table table-striped table-bordered';

      return css;
    },
  },
  methods: {
    getRowData: function getRowData(row, propertyName) {
      return row[propertyName];
    },
    initialize: function initialize(data) {
      const gridData = {
        props: [],
        rows: [],
        actions: null,
        skipBootstrap: false,
      };

      if (Array.isArray(data)) {
        const firstElem = data[0];
        const firstElemProps = this.getObjectProperties(firstElem);
        gridData.props = firstElemProps;
        gridData.rows = data;
      } else {
        gridData.actions = data.actions;

        if (!data.props) {
          const firstElem = data.data[0];
          const firstElemProps = this.getObjectProperties(firstElem);
          gridData.props = firstElemProps;
        } else {
          gridData.props = data.props;
        }

        gridData.rows = data.data;
        gridData.skipBootstrap = !!data.skipBootstrap;
      }

      return gridData;
    },
    getObjectProperties: function getObjectProperties(obj) {
      const propertyNames = Object.getOwnPropertyNames(obj);
      return propertyNames.filter(name => name !== '__ob__' && !this.isFunction(obj[name]));
    },
    isFunction: function isFunction(functionToCheck) {
      return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
    },
  },
};
</script>

<style lang="less" scoped>
.grid-actions button {
  margin-right: 5px;
}

.grid-header {
  text-transform: capitalize;
}
</style>
