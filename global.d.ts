declare module "*.pug" {
    const value: (data: any) => string;
    export default value;
}

declare module "*.json" {
    const value: any;
    export default value;
}

declare module "*.scss" {
    const value: any;
    export default value;
}

declare module "*.svg" {
    const value: React.FC<React.SVGProps<SVGSVGElement>>;
    export default value;
}

declare var NXTDynamicWidget: any;
declare const Configs: {[k: string]: string};
