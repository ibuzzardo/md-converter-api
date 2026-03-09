export interface ConvertRequestBody {
  markdown: string;
}

export interface ConvertResponse {
  success: true;
  data: {
    html: string;
  };
}

export interface ErrorResponse {
  success: false;
  error: {
    message: string;
    details?: string[];
  };
}

export interface HealthResponse {
  success: true;
  message: string;
}
