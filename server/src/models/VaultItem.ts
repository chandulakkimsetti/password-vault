// server/src/models/VaultItem.ts
import mongoose, { Document, Schema } from 'mongoose';

export interface IVaultItem extends Document {
  user: Schema.Types.ObjectId;
  title: string;
  username: string;
  password_encrypted: string;
  url?: string;
  notes?: string;
}

const vaultItemSchema = new Schema<IVaultItem>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: { type: String, required: true },
  username: { type: String, required: true },
  password_encrypted: { type: String, required: true },
  url: { type: String },
  notes: { type: String },
}, {
  timestamps: true
});

const VaultItem = mongoose.model<IVaultItem>('VaultItem', vaultItemSchema);

export default VaultItem;