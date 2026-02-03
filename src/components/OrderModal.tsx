import type React from "react"

interface Props {
    title: string,
    message: string,
    onConfirm: () => void,
    onCancel: () => void
}

const OrderModal: React.FC<Props> = ({ title, message, onConfirm, onCancel }) => {
    return (
        <div className="modal-overlay" onClick={onCancel}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <h3>{title}</h3>
                <p>{message}</p>

                <div className="modal-actions">
                    <button className="cancel" onClick={onCancel}>
                        Cancel
                    </button>
                    <button className="confirm" onClick={onConfirm}>
                        Confirm Order
                    </button>
                </div>
            </div>
        </div>
    )
}

export default OrderModal