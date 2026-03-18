#include <bits/stdc++.h>
using namespace std;

int main() {
    int T;
    cin >> T;
    while(T--) {
        int N;
        string A, B;
        cin >> N >> A >> B;
        bool A_mono = true, B_mono = true;

        if(N > 0) {
            char fa = A[0], fb = B[0];
            for(char c : A) if(c != fa) A_mono = false;
            for(char c : B) if(c != fb) B_mono = false;
        }

        if(A == B) {
            cout << 0 << endl;
            cout << 0 << endl;
            continue;
        }

        int min_cost = (A_mono || B_mono) ? 1 : 0;
        cout << min_cost << endl;

        vector<pair<int, int>> ops;
        string curr = A;

        if(min_cost == 0) {
            vector<int> is_mis(N);
            int cur_h = 0;
            for(int j = 0; j < N; j++) {
                is_mis[j] = (curr[j] != B[j]);
                cur_h += is_mis[j];
            }

            vector<int> pref(N + 1, 0);
            for(int j = 0; j < N; j++) pref[j + 1] = pref[j] + is_mis[j];
            while(cur_h > 0) {
                int L = -1;

                for(int j = 0; j < N; j++) if(is_mis[j]) {
                    L = j; break;
                }

                if(L == -1) break;
                int best_new = INT_MAX;
                int best_r = -1;

                for(int r = 0; r < N; r++) {
                    if(r == L) continue;
                    if(curr[L] == curr[r]) continue;
                    int ll = min(L, r);
                    int rr = max(L, r);
                    int mrange = pref[rr + 1] - pref[ll];
                    int len_ = rr - ll + 1;
                    int newh = cur_h - 2 * mrange + len_;
                    if(newh < best_new) {
                        best_new = newh;
                        best_r = r;
                    }
                }

                if(best_r != -1 && best_new < cur_h) {
                    int ll = min(L, best_r);
                    int rr = max(L, best_r);
                    ops.emplace_back(ll + 1, rr + 1);
                    int mrange = pref[rr + 1] - pref[ll];
                    for(int j = ll; j <= rr; j++) {
                        curr[j] = '0' + '1' - curr[j];
                        is_mis[j] = 1 - is_mis[j];
                    }

                    cur_h = best_new;
                    pref[0] = 0;

                    for(int j = 0; j < N; j++) pref[j + 1] = pref[j] + is_mis[j];

                } else {
                    int j = -1;
                    for(int k = L; k < N; k++) if(curr[k] != curr[L]) { j = k; break; }
                    if(j == -1) for(int k = L - 1; k >= 0; k--) if(curr[k] != curr[L]) { j = k; break; }
                    if(j != -1) {
                        int ll = min(L, j);
                        int rr = max(L, j);
                        ops.emplace_back(ll + 1, rr + 1);
                        int mrange = pref[rr + 1] - pref[ll];
                        for(int k = ll; k <= rr; k++) {
                            curr[k] = '0' + '1' - curr[k];
                            is_mis[k] = 1 - is_mis[k];
                        }

                        cur_h = cur_h - 2 * mrange + (rr - ll + 1);
                        pref[0] = 0;
                        for(int k = 0; k < N; k++) pref[k + 1] = pref[k] + is_mis[k];

                    } else {
                        break;
                    }
                }
            }
        } else {
            if(A_mono && B_mono) {
                ops.emplace_back(1, N);
                for(int i = 0; i < N; i++) curr[i] = '0' + '1' - curr[i];

            } else if(B_mono) {
                vector<int> is_mis(N);
                int cur_h = 0;
                for(int j = 0; j < N; j++) {
                    is_mis[j] = (curr[j] != B[j]);
                    cur_h += is_mis[j];
                }

                vector<int> pref(N + 1, 0);
                for(int j = 0; j < N; j++) pref[j + 1] = pref[j] + is_mis[j];

                while(cur_h > 0) {
                    if(cur_h == 1) {
                        int the_i = -1;
                        for(int k = 0; k < N; k++) if(is_mis[k]) { the_i = k; break; }
                        ops.emplace_back(the_i + 1, the_i + 1);
                        curr[the_i] = '0' + '1' - curr[the_i];
                        break;
                    }

                    int L = -1;
                    for(int j = 0; j < N; j++) if(is_mis[j]) { L = j; break; }
                    int best_new = INT_MAX;
                    int best_r = -1;

                    for(int r = 0; r < N; r++) {
                        if(r == L) continue;
                        if(curr[L] == curr[r]) continue;
                        int ll = min(L, r);
                        int rr = max(L, r);
                        int mrange = pref[rr + 1] - pref[ll];
                        int len_ = rr - ll + 1;
                        int newh = cur_h - 2 * mrange + len_;
                        if(newh < best_new) {
                            best_new = newh;
                            best_r = r;
                        }
                    }

                    if(best_r != -1 && best_new < cur_h) {
                        int ll = min(L, best_r);
                        int rr = max(L, best_r);
                        ops.emplace_back(ll + 1, rr + 1);
                        int mrange = pref[rr + 1] - pref[ll];
                        for(int k = ll; k <= rr; k++) {
                            curr[k] = '0' + '1' - curr[k];
                            is_mis[k] = 1 - is_mis[k];
                        }
                        cur_h = best_new;
                        pref[0] = 0;
                        for(int k = 0; k < N; k++) pref[k + 1] = pref[k] + is_mis[k];
                    } else {
                        int j = -1;
                        for(int k = L; k < N; k++) if(curr[k] != curr[L]) { j = k; break; }
                        if(j == -1) for(int k = L - 1; k >= 0; k--) if(curr[k] != curr[L]) { j = k; break; }
                        if(j != -1) {
                            int ll = min(L, j);
                            int rr = max(L, j);
                            ops.emplace_back(ll + 1, rr + 1);
                            int mrange = pref[rr + 1] - pref[ll];
                            for(int k = ll; k <= rr; k++) {
                                curr[k] = '0' + '1' - curr[k];
                                is_mis[k] = 1 - is_mis[k];
                            }
                            cur_h = cur_h - 2 * mrange + (rr - ll + 1);
                            pref[0] = 0;
                            for(int k = 0; k < n; k++) pref[k + 1] = pref[k] + is_mis[k];
                        } else {
                            break;
                        }
                    }
                }
            } else {

                int the_i = -1;
                for(int k = 0; k < N; k++) if(curr[k] != B[k]) { the_i = k; break; }
                if(the_i != -1) {
                    ops.emplace_back(the_i + 1, the_i + 1);
                    curr[the_i] = '0' + '1' - curr[the_i];
                }

                vector<int> is_mis(n);
                int cur_h = 0;
                for(int j = 0; j < n; j++) {
                    is_mis[j] = (curr[j] != B[j]);
                    cur_h += is_mis[j];
                }

                vector<int> pref(n + 1, 0);

                for(int j = 0; j < n; j++) pref[j + 1] = pref[j] + is_mis[j];
                while(cur_h > 0) {
                    int L = -1;
                    for(int j = 0; j < n; j++) if(is_mis[j]) { L = j; break; }
                    if(L == -1) break;
                    int best_new = INT_MAX;
                    int best_r = -1;
                    for(int r = 0; r < n; r++) {
                        if(r == L) continue;
                        if(curr[L] == curr[r]) continue;
                        int ll = min(L, r);
                        int rr = max(L, r);
                        int mrange = pref[rr + 1] - pref[ll];
                        int len_ = rr - ll + 1;
                        int newh = cur_h - 2 * mrange + len_;
                        if(newh < best_new) {
                            best_new = newh;
                            best_r = r;
                        }
                    }

                    if(best_r != -1 && best_new < cur_h) {
                        int ll = min(L, best_r);
                        int rr = max(L, best_r);
                        ops.emplace_back(ll + 1, rr + 1);
                        int mrange = pref[rr + 1] - pref[ll];
                        for(int k = ll; k <= rr; k++) {
                            curr[k] = '0' + '1' - curr[k];
                            is_mis[k] = 1 - is_mis[k];
                        }
                        
                        cur_h = best_new;
                        pref[0] = 0;
                        for(int k = 0; k < n; k++) pref[k + 1] = pref[k] + is_mis[k];
                    } else {
                        int j = -1;
                        for(int k = L; k < N; k++) if(curr[k] != curr[L]) { j = k; break; }
                        if(j == -1) for(int k = L - 1; k >= 0; k--) if(curr[k] != curr[L]) { j = k; break; }

                        if(j != -1) {
                            int ll = min(L, j);
                            int rr = max(L, j);
                            ops.emplace_back(ll + 1, rr + 1);
                            int mrange = pref[rr + 1] - pref[ll];
                            for(int k = ll; k <= rr; k++) {
                                curr[k] = '0' + '1' - curr[k];
                                is_mis[k] = 1 - is_mis[k];
                            }
                            
                            cur_h = cur_h - 2 * mrange + (rr - ll + 1);
                            pref[0] = 0;
                            for(int k = 0; k < n; k++) pref[k + 1] = pref[k] + is_mis[k];
                        } else {
                            break;
                        }
                    }
                }
            }
        }

        cout << ops.size() << endl;
        for(auto p : ops) {
            cout << p.first << " " << p.second << endl;
        }
    }
    return 0;
}