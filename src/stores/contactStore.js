import { defineStore } from "pinia";

export const useContactStore = defineStore("contact", {
    state: () => ({
        contacts: []
    }),
    actions: {
        async initContactList() {
            try {
                const serverAPI = import.meta.env.VITE_SERVER_API;
                const response = await fetch(`${serverAPI}/contacts`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json'
                    }
                });
                return this.contacts = await response.json();
            } catch (error) {
                console.error("Lỗi khi tải danh sách liên hệ:", error);
            }
        },
        addNewContact(contact) {
            if (!this.contacts.some(c => c.id === contact.id)) {
                this.contacts.unshift(contact);
            }
        }
    }
});