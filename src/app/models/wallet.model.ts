/**
 * Wallet Duration Type Model
 * Defines the structure for wallet validity periods
 */

export type WalletDurationType = '7_days' | '30_days' | '90_days' | '180_days' | '365_days' | 'lifetime';

export interface WalletDurationConfig {
  type: WalletDurationType;
  label: string;
  days: number | null; // null for lifetime
  description: string;
}

export const WALLET_DURATIONS: Record<WalletDurationType, WalletDurationConfig> = {
  '7_days': {
    type: '7_days',
    label: '7 Days',
    days: 7,
    description: 'Valid for 7 days from date of recharge'
  },
  '30_days': {
    type: '30_days',
    label: '30 Days',
    days: 30,
    description: 'Valid for 30 days from date of recharge'
  },
  '90_days': {
    type: '90_days',
    label: '90 Days',
    days: 90,
    description: 'Valid for 90 days (3 months) from date of recharge'
  },
  '180_days': {
    type: '180_days',
    label: '180 Days',
    days: 180,
    description: 'Valid for 180 days (6 months) from date of recharge'
  },
  '365_days': {
    type: '365_days',
    label: '1 Year',
    days: 365,
    description: 'Valid for 365 days (1 year) from date of recharge'
  },
  'lifetime': {
    type: 'lifetime',
    label: 'Lifetime',
    days: null,
    description: 'No expiry date'
  }
};

/**
 * Recharge History Record Interface
 */
export interface RechargeHistoryRecord {
  id: number;
  transactionDate: string;
  reference: string;
  paymentId: string;
  transactionType: string;
  amount: number;
  status: RechargeStatus;
  source: PaymentSource;
  addedBy: string;
  durationValidity?: WalletDurationType;
  expiryDate?: string;
}

/**
 * Wallet Transaction Status
 */
export type RechargeStatus = 'Success' | 'Failed' | 'Pending';

/**
 * Payment Source/Method
 */
export type PaymentSource = 'PhonePe' | 'Google Pay' | 'PayTM' | 'Credit Card' | 'Debit Card' | 'Bank Transfer' | 'UPI' | 'Other';

/**
 * Wallet Balance Interface
 */
export interface WalletBalance {
  id: string;
  totalBalance: number;
  availableBalance: number;
  frozenBalance: number;
  expiringBalance?: number;
  expiryDate?: string;
  lastUpdated: string;
}

/**
 * Add Money Request Interface
 */
export interface AddMoneyRequest {
  amount: number;
  paymentMethod: PaymentMethod;
  promoCode?: string;
  durationValidity?: WalletDurationType;
  notes?: string;
}

/**
 * Payment Method Type
 */
export type PaymentMethod = 'phonepe' | 'googlepay' | 'paytm' | 'upi' | 'credit_card' | 'debit_card' | 'bank_transfer';

/**
 * Wallet Filter Criteria
 */
export interface WalletFilterCriteria {
  dateRange?: {
    startDate: Date;
    endDate: Date;
  };
  searchType?: 'reference' | 'paymentId' | 'transactionType' | 'trackingId';
  searchValue?: string;
  amountMin?: number;
  amountMax?: number;
  status?: RechargeStatus;
  source?: PaymentSource;
}

/**
 * Wallet API Response
 */
export interface WalletApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  timestamp: string;
  page?: number;
  pageSize?: number;
  total?: number;
}
