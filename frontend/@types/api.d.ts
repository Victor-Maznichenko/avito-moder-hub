type ID = number;
type DateTime = string; // ISO date-time
type DateString = string; // YYYY-MM-DD

// --- Core entities ---
interface Advertisement {
  category: string;
  categoryId: ID;
  characteristics?: Record<string, string>;
  createdAt: DateTime;
  description: string;
  id: ID;
  images: string[];
  moderationHistory?: ModerationHistory[];
  price: number;
  priority: 'normal' | 'urgent';
  seller: Seller;
  status: 'approved' | 'draft' | 'pending' | 'rejected';
  title: string;
  updatedAt: DateTime;
}

interface Seller {
  id: ID;
  name: string;
  rating: string;
  registeredAt: DateTime;
  totalAds: number;
}

interface ModerationHistory {
  action: 'approved' | 'rejected' | 'requestChanges';
  comment?: string;
  id: ID;
  moderatorId: ID;
  moderatorName: string;
  reason?: string | null;
  timestamp: DateTime;
}
interface Pagination {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
  totalPages: number;
}

interface StatsSummary {
  approvedPercentage: number;
  averageReviewTime: number; // seconds (или миллисекунды) — уточнить по API
  rejectedPercentage: number;
  requestChangesPercentage: number;
  totalReviewed: number;
  totalReviewedThisMonth: number;
  totalReviewedThisWeek: number;
  totalReviewedToday: number;
}

interface ActivityData {
  approved: number;
  date: DateString;
  rejected: number;
  requestChanges: number;
}

interface DecisionsData {
  approved: number;
  rejected: number;
  requestChanges: number;
}

interface Moderator {
  email: string;
  id: ID;
  name: string;
  permissions: string[]; // список прав (строк)
  role: string;
  statistics: ModeratorStats;
}

interface ModeratorStats {
  approvalRate: number;
  averageReviewTime: number;
  thisMonthReviewed: number;
  thisWeekReviewed: number;
  todayReviewed: number;
  totalReviewed: number;
}

// --- Params ---
interface PostAdUnsuitableParams {
  comment?: string;
  reason: string;
}

interface GetAdsParams {
  categoryId?: ID;
  limit?: number; // default 10, max 100
  maxPrice?: number;
  minPrice?: number;
  page?: number; // default 1
  search?: string;
  sortBy?: 'createdAt' | 'price' | 'priority';
  sortOrder?: 'asc' | 'desc';
  status?: ('approved' | 'draft' | 'pending' | 'rejected')[]; // можно несколько
}

interface GetChartParams {
  endDate?: DateTime;
  period?: 'custom' | 'month' | 'today' | 'week';
  startDate?: DateTime;
}

// --- Responces ---
interface GetAdsResponse {
  ads: Advertisement[];
  pagination: Pagination;
}

interface PostAdResponse {
  ad: Advertisement;
  message: string;
}

// --- Error responses ---
interface BadRequestError {
  error: string;
  message: string;
}

interface NotFoundError {
  error: string;
  id?: ID;
}

interface InternalServerError {
  error: string;
  message: string;
}

// категории — объект с динамическими ключами (id/name) и значением count
type CategoriesDistribution = Record<string, number>;

interface ApiResponse<T> {
  data: T;
  // можно расширить полями meta, status и т.д. в зависимости от реального API
}
