export interface VehicleData {
    vin: string;
    vinValid: boolean;
    year?: number;
    make?: string;
    model?: string;
    trim?: string;
    bodyClass?: string;
    engineCylinders?: string;
    engineDisplacement?: string;
    fuelType?: string;
    driveType?: string;
    vehicleType?: string;
    manufacturer?: string;
    origin?: string;
    photos?: string[];
    recalls?: {
        count: number;
        summary?: string;
    };
    error?: string;
    code?: string;
}

export interface Recall {
    manufacturer: string;
    nhtsaCampaignNumber: string;
    reportReceivedDate: string;
    component: string;
    summary: string;
    consequence: string;
    remedy: string;
    parkIt?: boolean;
    parkOutSide?: boolean;
    overTheAirUpdate?: boolean;
}

export interface DetailedSpecs {
    vehicle?: {
        year: number;
        make: string;
        model: string;
    };
    specs?: any; // Keeping it flexible for now
}

export interface TCOData {
    vin: string;
    data?: any;
}

export interface VINProvider {
    decode(vin: string): Promise<VehicleData>;
    getRecalls?(vin: string): Promise<Recall[]>;
    getSpecs?(vin: string): Promise<DetailedSpecs>;
    getTCO?(vin: string): Promise<TCOData>;
}
