export const DATA_TYPES = [
  { label: 'Fetched Order Date', value: 'fetched_order_date' },
  { label: 'Placed Date', value: 'placed_date' },
  { label: 'Delivered Date', value: 'delivered_date' }
] as const;

export const SEARCH_TYPES = [
  { label: 'Order Id', value: 'order_id' },
  { label: 'Order Number', value: 'order_number' },
  { label: 'Product SKU', value: 'product_sku' },
  { label: 'Consignee Name', value: 'consignee_name' },
  { label: 'Consignee Email', value: 'consignee_email' },
  { label: 'Consignee Mobile No.', value: 'consignee_mobile' },
  { label: 'Pincode', value: 'pincode' },
  { label: 'Address', value: 'address' },
  { label: 'Merge Order', value: 'merge_order' }
] as const;

export const ADVANCE_FILTERS = [
  { label: 'Wrong Address', value: 'wrong_address' },
  { label: 'Duplicate Order', value: 'duplicate_order' }
] as const;

export const CHANNEL_TABS = [
  { label: 'Channel Order', id: 'orders' },
  { label: 'Channel', id: 'channels' },
  { label: 'Add Channel', id: 'add' }
] as const;

export const STATUS_TABS = [
  { label: 'Pending', id: 'pending' },
  { label: 'Ready to ship', id: 'ready_to_ship' },
  { label: 'Reship', id: 'reship' },
  { label: 'Failed', id: 'failed' },
  { label: 'Fulfilled', id: 'fulfilled' },
  { label: 'Junk', id: 'junk' },
  { label: 'On Process', id: 'on_process' }
] as const;

export const EXPORT_FORMATS = [
  { label: 'CSV', value: 'csv' },
  { label: 'Excel', value: 'excel' }
] as const;

export const PROCESS_TYPE = [
    {label: 'Process Bulk Order', value: 'process_bulk_order'},
    {label: 'Process selected Order', value: 'process_selected_order'},
    {label: 'Merge Order', value: 'merge_order'}
] as const;

export const BY_TAG = [
    {label: 'Process Bulk Order', value: 'process_bulk_order'},
    {label: 'Process selected Order', value: 'process_selected_order'},
    {label: 'Merge Order', value: 'merge_order'}
] as const;

export const AVAILABLE_CHANNELS = [
  {
    id: 'shopify',
    name: 'Shopify',
    logo: 'assets/images/channels/shopify.png', // Placeholder path
    logoClass: 'pi pi-shopping-bag', // Fallback icon
    color: '#95BF47'
  },
  {
    id: 'woocommerce',
    name: 'WooCommerce',
    logo: 'assets/images/channels/woocommerce.png',
    logoClass: 'pi pi-comments', // Fallback
    color: '#96588a'
  },
  {
    id: 'amazon',
    name: 'Amazon',
    logo: 'assets/images/channels/amazon.png',
    logoClass: 'pi pi-amazon',
    color: '#FF9900'
  },
  {
    id: 'gator', // Assuming the green monster is Gator or generic
    name: 'Gator', // Placeholder name
    logo: 'assets/images/channels/gator.png',
    logoClass: 'pi pi-shopping-cart',
    color: '#28a745'
  },
  {
    id: 'magento',
    name: 'Magento',
    logo: 'assets/images/channels/magento.png',
    logoClass: 'pi pi-box',
    color: '#ee672f'
  },
  {
    id: 'custom_api',
    name: 'Custom API',
    logo: 'assets/images/channels/api.png',
    logoClass: 'pi pi-cog',
    color: '#3b82f6'
  },
  {
    id: 'unicommerce',
    name: 'Unicommerce',
    logo: 'assets/images/channels/unicommerce.png',
    logoClass: 'pi pi-globe',
    color: '#00a1e0'
  }
] as const;
