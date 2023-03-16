import { Brush, Gear, Hammer, Nut, Pencil, Screwdriver, Wrench } from "../../node_modules/react-bootstrap-icons/dist/index"

export const ReceivingDocumentStatus = {
    New: 0,
    Accepted: 1,
    Rejected: 2,
    Modified: 3,
    Archived: 4
}

export const ReceivingDocumentStatusDescription = {
    0: 'New',
    1: 'Accepted',
    2: 'Rejected',
    3: 'Modified',
    4: 'Archived'
}

export const ProductType = {
    Product: 0,
    Component: 1,
    Scrap: 2
}

export const WorkstationsIcons = [
    <Hammer />,
    <Brush />,
    <Pencil />,
    <Gear />,
    <Nut />,
    <Screwdriver />,
    <Wrench />
]