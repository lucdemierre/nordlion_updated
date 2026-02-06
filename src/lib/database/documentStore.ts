// Document Store - Real documents with downloadable files
// Simulates database storage

import { Document } from './schema'

class DocumentStore {
  private documents: Map<string, Document> = new Map()

  constructor() {
    this.initializeData()
  }

  private initializeData() {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('nordlion_documents')
      if (saved) {
        const parsed = JSON.parse(saved)
        this.documents = new Map(Object.entries(parsed).map(([k, v]: [string, any]) => [
          k,
          { ...v, uploadedAt: new Date(v.uploadedAt) }
        ]))
      } else {
        this.seedDefaultDocuments()
      }
    }
  }

  private seedDefaultDocuments() {
    const defaultDocuments: Document[] = [
      {
        id: 'd1',
        userId: 'u1',
        orderId: 'o1',
        vehicleId: 'v1',
        type: 'invoice',
        name: 'Invoice-2024-001.pdf',
        url: 'data:application/pdf;base64,JVBERi0xLjQKJeLjz9MKMyAwIG9iago8PC9UeXBlL1BhZ2UvUGFyZW50IDIgMCBSL1Jlc291cmNlczw8L0ZvbnQ8PC9GMSA1IDAgUj4+Pj4vTWVkaWFCb3hbMCAwIDYxMiA3OTJdL0NvbnRlbnRzIDQgMCBSPj4KZW5kb2JqCjQgMCBvYmoKPDwvTGVuZ3RoIDE0Nj4+CnN0cmVhbQpCVAovRjEgMjQgVGYKNTAgNzUwIFRkCihJbnZvaWNlKSBUagowIC01MCBUZAovRjEgMTIgVGYKKERvY3VtZW50IElEOiAyMDI0LTAwMSkgVGoKMCAtMjAgVGQKKFRlc3QgZG9jdW1lbnQpIFRqCkVUCmVuZHN0cmVhbQplbmRvYmoKMiAwIG9iago8PC9UeXBlL1BhZ2VzL0NvdW50IDEvS2lkc1szIDAgUl0+PgplbmRvYmoKMSAwIG9iago8PC9UeXBlL0NhdGFsb2cvUGFnZXMgMiAwIFI+PgplbmRvYmoKNSAwIG9iago8PC9UeXBlL0ZvbnQvU3VidHlwZS9UeXBlMS9CYXNlRm9udC9IZWx2ZXRpY2E+PgplbmRvYmoKeHJlZgowIDYKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMzI4IDAwMDAwIG4gCjAwMDAwMDAyNzMgMDAwMDAgbiAKMDAwMDAwMDAxNSAwMDAwMCBuIAowMDAwMDAwMTIzIDAwMDAwIG4gCjAwMDAwMDAzNzcgMDAwMDAgbiAKdHJhaWxlcgo8PC9TaXplIDYvUm9vdCAxIDAgUj4+CnN0YXJ0eHJlZgo0NDUKJSVFT0YK',
        size: 445,
        uploadedAt: new Date('2024-01-15'),
        status: 'approved'
      },
      {
        id: 'd2',
        userId: 'u1',
        orderId: 'o1',
        vehicleId: 'v1',
        type: 'contract',
        name: 'Purchase-Agreement-GT3RS.pdf',
        url: 'data:application/pdf;base64,JVBERi0xLjQKJeLjz9MKMyAwIG9iago8PC9UeXBlL1BhZ2UvUGFyZW50IDIgMCBSL1Jlc291cmNlczw8L0ZvbnQ8PC9GMSA1IDAgUj4+Pj4vTWVkaWFCb3hbMCAwIDYxMiA3OTJdL0NvbnRlbnRzIDQgMCBSPj4KZW5kb2JqCjQgMCBvYmoKPDwvTGVuZ3RoIDE3MD4+CnN0cmVhbQpCVAovRjEgMjQgVGYKNTAgNzUwIFRkCihQdXJjaGFzZSBBZ3JlZW1lbnQpIFRqCjAgLTUwIFRkCi9GMSA0NCBUZAO1BvcmNoZSA5MTEgR1QzIFJTKSBUagowIC0yMCBUZAooVGVzdCBkb2N1bWVudCkgVGoKRVQKZW5kc3RyZWFtCmVuZG9iagoyIDAgb2JqCjw8L1R5cGUvUGFnZXMvQ291bnQgMS9LaWRzWzMgMCBSXT4+CmVuZG9iagoxIDAgb2JqCjw8L1R5cGUvQ2F0YWxvZy9QYWdlcyAyIDAgUj4+CmVuZG9iago1IDAgb2JqCjw8L1R5cGUvRm9udC9TdWJ0eXBlL1R5cGUxL0Jhc2VGb250L0hlbHZldGljYT4+CmVuZG9iagp4cmVmCjAgNgowMDAwMDAwMDAwIDY1NTM1IGYgCjAwMDAwMDAzNjggMDAwMDAgbiAKMDAwMDAwMDMxMyAwMDAwMCBuIAowMDAwMDAwMDE1IDAwMDAwIG4gCjAwMDAwMDAxMjMgMDAwMDAgbiAKMDAwMDAwMDQxNyAwMDAwMCBuIAp0cmFpbGVyCjw8L1NpemUgNi9Sb290IDEgMCBSPj4Kc3RhcnR4cmVmCjQ4NQolJUVPRgo=',
        size: 485,
        uploadedAt: new Date('2024-01-16'),
        status: 'approved'
      },
      {
        id: 'd3',
        userId: 'u1',
        orderId: 'o1',
        type: 'insurance',
        name: 'Insurance-Certificate.pdf',
        url: 'data:application/pdf;base64,JVBERi0xLjQKJeLjz9MKMyAwIG9iago8PC9UeXBlL1BhZ2UvUGFyZW50IDIgMCBSL1Jlc291cmNlczw8L0ZvbnQ8PC9GMSA1IDAgUj4+Pj4vTWVkaWFCb3hbMCAwIDYxMiA3OTJdL0NvbnRlbnRzIDQgMCBSPj4KZW5kb2JqCjQgMCBvYmoKPDwvTGVuZ3RoIDE1OD4+CnN0cmVhbQpCVAovRjEgMjQgVGYKNTAgNzUwIFRkCihJbnN1cmFuY2UgQ2VydGlmaWNhdGUpIFRqCjAgLTUwIFRkCi9GMSA0NCBUZAO1ZXN0IGRvY3VtZW50KSBUagpFVAplbmRzdHJlYW0KZW5kb2JqCjIgMCBvYmoKPDwvVHlwZS9QYWdlcy9Db3VudCAxL0tpZHNbMyAwIFJdPj4KZW5kb2JqCjEgMCBvYmoKPDwvVHlwZS9DYXRhbG9nL1BhZ2VzIDIgMCBSPj4KZW5kb2JqCjUgMCBvYmoKPDwvVHlwZS9Gb250L1N1YnR5cGUvVHlwZTEvQmFzZUZvbnQvSGVsdmV0aWNhPj4KZW5kb2JqCnhyZWYKMCA2CjAwMDAwMDAwMDAgNjU1MzUgZiAKMDAwMDAwMDM0MCAwMDAwMCBuIAowMDAwMDAwMjg1IDAwMDAwIG4gCjAwMDAwMDAwMTUgMDAwMDAgbiAKMDAwMDAwMDEyMyAwMDAwMCBuIAowMDAwMDAwMzg5IDAwMDAwIG4gCnRyYWlsZXIKPDwvU2l6ZSA2L1Jvb3QgMSAwIFI+PgpzdGFydHhyZWYKNDU3CiUlRU9GCg==',
        size: 457,
        uploadedAt: new Date('2024-01-20'),
        status: 'approved'
      },
      {
        id: 'd4',
        userId: 'u1',
        type: 'other',
        name: 'Drivers-License.pdf',
        url: 'data:application/pdf;base64,JVBERi0xLjQKJeLjz9MKMyAwIG9iago8PC9UeXBlL1BhZ2UvUGFyZW50IDIgMCBSL1Jlc291cmNlczw8L0ZvbnQ8PC9GMSA1IDAgUj4+Pj4vTWVkaWFCb3hbMCAwIDYxMiA3OTJdL0NvbnRlbnRzIDQgMCBSPj4KZW5kb2JqCjQgMCBvYmoKPDwvTGVuZ3RoIDE1MD4+CnN0cmVhbQpCVAovRjEgMjQgVGYKNTAgNzUwIFRkCihEcml2ZXJzIExpY2Vuc2UpIFRqCjAgLTUwIFRkCi9GMSA0NCBUZAO1ZXN0IGRvY3VtZW50KSBUagpFVAplbmRzdHJlYW0KZW5kb2JqCjIgMCBvYmoKPDwvVHlwZS9QYWdlcy9Db3VudCAxL0tpZHNbMyAwIFJdPj4KZW5kb2JqCjEgMCBvYmoKPDwvVHlwZS9DYXRhbG9nL1BhZ2VzIDIgMCBSPj4KZW5kb2JqCjUgMCBvYmoKPDwvVHlwZS9Gb250L1N1YnR5cGUvVHlwZTEvQmFzZUZvbnQvSGVsdmV0aWNhPj4KZW5kb2JqCnhyZWYKMCA2CjAwMDAwMDAwMDAgNjU1MzUgZiAKMDAwMDAwMDMzMiAwMDAwMCBuIAowMDAwMDAwMjc3IDAwMDAwIG4gCjAwMDAwMDAwMTUgMDAwMDAgbiAKMDAwMDAwMDEyMyAwMDAwMCBuIAowMDAwMDAwMzgxIDAwMDAwIG4gCnRyYWlsZXIKPDwvU2l6ZSA2L1Jvb3QgMSAwIFI+PgpzdGFydHhyZWYKNDQ5CiUlRU9GCg==',
        size: 449,
        uploadedAt: new Date('2024-01-10'),
        status: 'pending'
      },
      {
        id: 'd5',
        userId: 'u1',
        orderId: 'o2',
        vehicleId: 'v3',
        type: 'invoice',
        name: 'Invoice-2024-002.pdf',
        url: 'data:application/pdf;base64,JVBERi0xLjQKJeLjz9MKMyAwIG9iago8PC9UeXBlL1BhZ2UvUGFyZW50IDIgMCBSL1Jlc291cmNlczw8L0ZvbnQ8PC9GMSA1IDAgUj4+Pj4vTWVkaWFCb3hbMCAwIDYxMiA3OTJdL0NvbnRlbnRzIDQgMCBSPj4KZW5kb2JqCjQgMCBvYmoKPDwvTGVuZ3RoIDE0Nj4+CnN0cmVhbQpCVAovRjEgMjQgVGYKNTAgNzUwIFRkCihJbnZvaWNlKSBUagowIC01MCBUZAovRjEgMTIgVGYKKERvY3VtZW50IElEOiAyMDI0LTAwMikgVGoKMCAtMjAgVGQKKFRlc3QgZG9jdW1lbnQpIFRqCkVUCmVuZHN0cmVhbQplbmRvYmoKMiAwIG9iago8PC9UeXBlL1BhZ2VzL0NvdW50IDEvS2lkc1szIDAgUl0+PgplbmRvYmoKMSAwIG9iago8PC9UeXBlL0NhdGFsb2cvUGFnZXMgMiAwIFI+PgplbmRvYmoKNSAwIG9iago8PC9UeXBlL0ZvbnQvU3VidHlwZS9UeXBlMS9CYXNlRm9udC9IZWx2ZXRpY2E+PgplbmRvYmoKeHJlZgowIDYKMDAwMDAwMDAwMCA2NTUzNSBmIAowMDAwMDAwMzI4IDAwMDAwIG4gCjAwMDAwMDAyNzMgMDAwMDAgbiAKMDAwMDAwMDAxNSAwMDAwMCBuIAowMDAwMDAwMTIzIDAwMDAwIG4gCjAwMDAwMDAzNzcgMDAwMDAgbiAKdHJhaWxlcgo8PC9TaXplIDYvUm9vdCAxIDAgUj4+CnN0YXJ0eHJlZgo0NDUKJSVFT0YK',
        size: 445,
        uploadedAt: new Date('2024-02-01'),
        status: 'approved'
      },
      {
        id: 'd6',
        userId: 'u1',
        type: 'registration',
        name: 'Vehicle-Registration.pdf',
        url: 'data:application/pdf;base64,JVBERi0xLjQKJeLjz9MKMyAwIG9iago8PC9UeXBlL1BhZ2UvUGFyZW50IDIgMCBSL1Jlc291cmNlczw8L0ZvbnQ8PC9GMSA1IDAgUj4+Pj4vTWVkaWFCb3hbMCAwIDYxMiA3OTJdL0NvbnRlbnRzIDQgMCBSPj4KZW5kb2JqCjQgMCBvYmoKPDwvTGVuZ3RoIDE2Mj4+CnN0cmVhbQpCVAovRjEgMjQgVGYKNTAgNzUwIFRkCihWZWhpY2xlIFJlZ2lzdHJhdGlvbikgVGoKMCAtNTAgVGQKL0YxIDEyIFRmCihUZXN0IGRvY3VtZW50KSBUagpFVAplbmRzdHJlYW0KZW5kb2JqCjIgMCBvYmoKPDwvVHlwZS9QYWdlcy9Db3VudCAxL0tpZHNbMyAwIFJdPj4KZW5kb2JqCjEgMCBvYmoKPDwvVHlwZS9DYXRhbG9nL1BhZ2VzIDIgMCBSPj4KZW5kb2JqCjUgMCBvYmoKPDwvVHlwZS9Gb250L1N1YnR5cGUvVHlwZTEvQmFzZUZvbnQvSGVsdmV0aWNhPj4KZW5kb2JqCnhyZWYKMCA2CjAwMDAwMDAwMDAgNjU1MzUgZiAKMDAwMDAwMDM0OCAwMDAwMCBuIAowMDAwMDAwMjkzIDAwMDAwIG4gCjAwMDAwMDAwMTUgMDAwMDAgbiAKMDAwMDAwMDEyMyAwMDAwMCBuIAowMDAwMDAwMzk3IDAwMDAwIG4gCnRyYWlsZXIKPDwvU2l6ZSA2L1Jvb3QgMSAwIFI+PgpzdGFydHhyZWYKNDY1CiUlRU9GCg==',
        size: 465,
        uploadedAt: new Date('2024-01-25'),
        status: 'approved'
      }
    ]

    defaultDocuments.forEach(d => this.documents.set(d.id, d))
    this.saveToStorage()
  }

  private saveToStorage() {
    if (typeof window !== 'undefined') {
      const obj: Record<string, Document> = {}
      this.documents.forEach((d, id) => { obj[id] = d })
      localStorage.setItem('nordlion_documents', JSON.stringify(obj))
    }
  }

  getAll(): Document[] {
    return Array.from(this.documents.values())
  }

  getByUserId(userId: string): Document[] {
    return this.getAll().filter(d => d.userId === userId)
  }

  getById(id: string): Document | undefined {
    return this.documents.get(id)
  }

  downloadDocument(id: string): void {
    const doc = this.documents.get(id)
    if (!doc) return

    const link = document.createElement('a')
    link.href = doc.url
    link.download = doc.name
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  create(document: Omit<Document, 'id' | 'uploadedAt'>): Document {
    const newDoc: Document = {
      ...document,
      id: `d${Date.now()}`,
      uploadedAt: new Date()
    }
    this.documents.set(newDoc.id, newDoc)
    this.saveToStorage()
    return newDoc
  }

  delete(id: string): boolean {
    const deleted = this.documents.delete(id)
    if (deleted) this.saveToStorage()
    return deleted
  }
}

export const documentStore = new DocumentStore()
