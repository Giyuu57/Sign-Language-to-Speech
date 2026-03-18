#include <bits/stdc++.h>
using namespace std;

int main() {
    int ;
    cin >> t;
    for(int test = 0; test < t; test++) {
        int n;
        string A, B;
        cin >> n >> A >> B;
        if(A == B) {
            cout << 0 << endl;
            cout << 0 << endl;
            continue;
        }
        bool a_mono = true;
        bool b_mono = true;
        char fa = A[0];
        char fb = B[0];
        for(char c : A) if(c != fa) a_mono = false;
        for(char c : B) if(c != fb) b_mono = false;
        int min_cost = (a_mono || b_mono) ? 1 : 0;
        cout << min_cost << endl;
        vector<pair<int, int>> ops;
        string curr = A;
        auto apply_flip = [&](int l, int r) {
            for(int i = l; i <= r; i++) {
                curr[i] = '0' + '1' - curr[i];
            }
        };
        if(min_cost == 0) {

            while(true) {
                int i = -1;
                for(int k = 0; k < n; k++) {
                    if(curr[k] != B[k]) {
                        i = k;
                        break;
                    }
                }
                if(i == -1) break;
                int j = -1;
                for(int k = i; k < n; k++) {
                    if(curr[k] != curr[i]) {
                        j = k;
                        break;
                    }
                }
                if(j == -1) {
                    for(int k = i - 1; k >= 0; k--) {
                        if(curr[k] != curr[i]) {
                            j = k;
                            break;
                        }
                    }
                }
                if(j == -1) {

                    break;
                }
                int L = min(i, j);
                int R = max(i, j);
                ops.emplace_back(L + 1, R + 1);
                apply_flip(L, R);
            }
        } else {
            if(a_mono && b_mono) {

                ops.emplace_back(1, n);
                apply_flip(0, n - 1);
            } else if(b_mono) {

                while(true) {
                    int i = -1;
                    int mismatch_cnt = 0;
                    for(int k = 0; k < n; k++) {
                        if(curr[k] != B[k]) {
                            mismatch_cnt++;
                            i = k;
                        }
                    }
                    if(mismatch_cnt == 0) break;
                    if(mismatch_cnt == 1) {

                        ops.emplace_back(i + 1, i + 1);
                        apply_flip(i, i);
                        break;
                    }

                    int pos = -1;
                    for(int k = 0; k < n; k++) {
                        if(curr[k] != B[k]) {
                            pos = k;
                            break;
                        }
                    }
                    int j = -1;
                    for(int k = pos; k < n; k++) {
                        if(curr[k] != curr[pos]) {
                            j = k;
                            break;
                        }
                    }
                    if(j == -1) {
                        for(int k = pos - 1; k >= 0; k--) {
                            if(curr[k] != curr[pos]) {
                                j = k;
                                break;
                            }
                        }
                    }
                    if(j != -1) {
                        int L = min(pos, j);
                        int R = max(pos, j);
                        ops.emplace_back(L + 1, R + 1);
                        apply_flip(L, R);
                    } else {
                        break;
                    }
                }
            } else {

                int first_mis = -1;
                for(int k = 0; k < n; k++) {
                    if(curr[k] != B[k]) {
                        first_mis = k;
                        break;
                    }
                }
                if(first_mis != -1) {
                    ops.emplace_back(first_mis + 1, first_mis + 1);
                    apply_flip(first_mis, first_mis);
                }

                while(true) {
                    int i = -1;
                    for(int k = 0; k < n; k++) {
                        if(curr[k] != B[k]) {
                            i = k;
                            break;
                        }
                    }
                    if(i == -1) break;
                    int j = -1;
                    for(int k = i; k < n; k++) {
                        if(curr[k] != curr[i]) {
                            j = k;
                            break;
                        }
                    }
                    if(j == -1) {
                        for(int k = i - 1; k >= 0; k--) {
                            if(curr[k] != curr[i]) {
                                j = k;
                                break;
                            }
                        }
                    }
                    if(j == -1) break;
                    int L = min(i, j);
                    int R = max(i, j);
                    ops.emplace_back(L + 1, R + 1);
                    apply_flip(L, R);
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